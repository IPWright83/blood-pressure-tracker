"use client"

import { scaleLinear, scaleTime } from "d3-scale";
import { extent } from "d3-array";
import { line } from "d3-shape";
import { useMemo } from "react";

import { PressureAxis } from "./PressureAxis";
import { TimeAxis } from "./TimeAxis";
import { PulseAxis } from "./PulseAxis";
import { IdealBand } from "./IdealBand";
import { Legend } from "./Legend";

import { useTargetWidth } from "../useTargetWidth";
import type { IData, IMargin, IDatum } from "../../types";

import "./AveragesChart.css";

type Props = {
    height?: number;
    margin?: IMargin
    data?: IData;
}

export const AveragesChart = ({
    height = 700, 
    margin = { top: 10, bottom: 70, left: 70, right: 70 },
    data = [],
}: Props) => {
    const [target, width] = useTargetWidth(margin);

    const pressureScale = useMemo(() => scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain([0, 240])
        .nice()
        , [height, margin.bottom, margin.top]);

    const pulseScale = useMemo(() => scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain([0, 200])
        .nice()
        , [height, margin.bottom, margin.top]);

    const timeScale = useMemo(() => {
        const extents = extent(data, (d: IDatum) => d.timestamp) as Date[];
        if (!extents[0]) { 
            const today = new Date();
            today.setDate(today.getDate() - 1);
            extents[0] = today;
        }
        if (!extents[1]) { extents[1] = new Date() }

        return scaleTime()
            .range([margin.left, width - margin.right])
            .domain(extents)
            .nice()
    }, [width, margin.left, margin.right, data])

    const sysD = line<IDatum>()
        .x((d) => timeScale(d.timestamp))
        .y((d) => pressureScale(d.sys))
        (data)

    const diaD = line<IDatum>()
        .x((d) => timeScale(d.timestamp))
        .y((d) => pressureScale(d.dia))
        (data)

    const pulseD = line<IDatum>()
        .x((d) => timeScale(d.timestamp))
        .y((d) => pulseScale(d.pulse))
        (data)

    return (
        <div style={{ width: "100%", marginTop: 20, }} ref={target}>
            <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Blood pressure over time</h3>
            <svg width={width} height={height}>
                <Legend margin={margin} />
                <g className="axis">
                    <PressureAxis scale={pressureScale} height={height} margin={margin} />
                    <TimeAxis scale={timeScale} height={height} width={width} margin={margin} />
                    <PulseAxis scale={pulseScale} height={height} width={width} margin={margin} />
                    <IdealBand width={width} margin={margin} scale={pressureScale} />
                </g>
                <g className="data">
                    {sysD && <path className="avgSys" d={sysD} stroke="steelblue" fill="none" />}
                    {diaD && <path className="avgDia" d={diaD} stroke="steelblue" fill="none" />}
                    {pulseD && <path className="avgPulse" d={pulseD} stroke="red" fill="none" />}
                </g>
            </svg>
        </div>)
}
