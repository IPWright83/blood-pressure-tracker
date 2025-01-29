"use client"

import type { ScaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { useEffect, useRef } from "react";

import { IMargin } from "../../types";

type Props = {
    margin: IMargin,
    height: number;
    scale: ScaleLinear<number, number>
}

/**
 * Renders an Axis for the Systolic & Diastolic measurements
 */
export const PressureAxis = ({ scale, height, margin }: Props) => {
    const axis = useRef<SVGGElement>(null);

    const plotHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        if (axis.current) {
            select(axis.current).call(axisLeft(scale));
        }
    }, [scale])

    return <>
        <text 
            y={20} 
            x={margin.left} 
            textAnchor="end" 
            transform={`translate(${[0, plotHeight / 2]})rotate(-90)`}
        >
            Pressure mmHg
        </text>
        <g 
            className="pressureAxis" 
            transform={`translate(${margin.left}, 0)`} 
            ref={axis} 
        />
    </>
}
