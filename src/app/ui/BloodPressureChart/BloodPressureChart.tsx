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

import "./BloodPressureChart.css";

type Props = {
    width?: number;
    height?: number;
    margin?: {
        top: number;
        left: number;
        bottom: number;
        right: number;
    }
}



const data = [
    { timestamp: "2025-01-15T00:00:00.000Z", sys: 142, dia: 96, pulse: 89 },
    { timestamp: "2025-01-16T00:00:00.000Z", sys: 152, dia: 84, pulse: 103 },
    { timestamp: "2025-01-17T00:00:00.000Z", sys: 102, dia: 79, pulse: 78 },
    { timestamp: "2025-01-18T00:00:00.000Z", sys: 120, dia: 96, pulse: 84 },
    { timestamp: "2025-01-19T00:00:00.000Z", sys: 140, dia: 116, pulse: 84 },
    { timestamp: "2025-01-20T00:00:00.000Z", sys: 110, dia: 106, pulse: 84 },
    { timestamp: "2025-01-21T00:00:00.000Z", sys: 135, dia: 99, pulse: 84 },
    { timestamp: "2025-01-22T00:00:00.000Z", sys: 147, dia: 87, pulse: 84 },
    { timestamp: "2025-01-23T00:00:00.000Z", sys: 158, dia: 77, pulse: 84 },
    { timestamp: "2025-01-24T00:00:00.000Z", sys: 125, dia: 75, pulse: 84 },
    { timestamp: "2025-01-25T00:00:00.000Z", sys: 140, dia: 82, pulse: 84 },
    { timestamp: "2025-01-26T00:00:00.000Z", sys: 147, dia: 89, pulse: 84 },
    { timestamp: "2025-01-27T00:00:00.000Z", sys: 138, dia: 93, pulse: 84 },
    { timestamp: "2025-01-28T00:00:00.000Z", sys: 128, dia: 103, pulse: 84 }
]

export const BloodPressureChart = ({ 
    width = 900, 
    height = 700, 
    margin = { top: 30, bottom: 30, left: 200, right: 200 } 
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
            {data.map(d => <Reading key={d.timestamp} sys={d.sys} dia={d.dia} systolicScale={systolicScale} diastolicScale={diastolicScale} width={width} margin={margin} />)}
            {hasAverages && <AverageReading avgSys={avgSys} avgDia={avgDia} systolicScale={systolicScale} diastolicScale={diastolicScale} width={width} margin={margin} />}
        </g>
    </svg>
}
