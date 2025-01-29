"use client"

import { scaleLinear } from "d3-scale";
import { mean } from "d3-array";
import { useMemo } from "react";

import { SystolicAxis } from "./SystolicAxis";
import { DiastolicAxis } from "./DiastolicAxis";
import { SystolicBands } from "./SystolicBands";
import { DiastolicBands } from "./DiastolicBands";
import { MeasurementBands } from "./MeasurementBands";
import { Reading } from "./Reading";
import { AverageReading } from "./AverageReading";

import type { IData, IMargin } from "../../types";

import "./BloodPressureChart.css";

type Props = {
    width?: number;
    height?: number;
    margin?: IMargin
    data?: IData;
}

export const BloodPressureChart = ({ 
    width = 900, 
    height = 700, 
    margin = { top: 30, bottom: 30, left: 200, right: 200 },
    data = [],
}: Props) => {
    const systolicScale = useMemo(() => 
        scaleLinear()
            .range([height - margin.bottom - margin.top, margin.top])
            .domain([50, 230])
            .nice()
        , [height, margin.bottom, margin.top]);

    const diastolicScale = useMemo(() => 
        scaleLinear()
            .range([
                height - margin.bottom - margin.top - DiastolicAxis.ScaleOffset,
                margin.top + DiastolicAxis.ScaleOffset
            ])
            .domain([0, 140])
            .nice()
        , [height, margin.bottom, margin.top]);

    const avgSys = mean(data, d => d.sys);
    const avgDia = mean(data, d => d.dia);
    const hasAverages = avgSys !== undefined && avgDia !== undefined;

    return <svg width={width} height={height}>
        <g className="bands">
            <SystolicBands scale={systolicScale} margin={margin} bandwidth={30} />
            <DiastolicBands scale={diastolicScale} margin={margin} bandwidth={30} width={width} />
            <MeasurementBands margin={margin} width={width} systolicScale={systolicScale} diastolicScale={diastolicScale} bandwidth={30} />
        </g>
        <g className="axis">
            <SystolicAxis scale={systolicScale} margin={margin} />
            <DiastolicAxis scale={diastolicScale} margin={margin} width={width} />
        </g>
        <g className="data">
            {data.map(d => <Reading key={+d.timestamp} sys={d.sys} dia={d.dia} systolicScale={systolicScale} diastolicScale={diastolicScale} width={width} margin={margin} />)}
            {hasAverages && <AverageReading avgSys={avgSys} avgDia={avgDia} systolicScale={systolicScale} diastolicScale={diastolicScale} width={width} margin={margin} />}
        </g>
    </svg>
}
