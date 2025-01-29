"use client"

import type { ScaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { axisRight } from "d3-axis";
import { useEffect, useRef } from "react";

import { IMargin } from "../../types";

type Props = {
    width: number;
    height: number;
    margin: IMargin,
    scale: ScaleLinear<number, number>
}

/**
 * Renders an Axis for the Pulse measurements
 */
export const PulseAxis = ({ scale, width, height, margin }: Props) => {
    const axis = useRef<SVGGElement>(null);

    const plotHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        if (axis.current) {
            select(axis.current).call(axisRight(scale));
        }
    }, [scale])

    return <>
        <text 
            y={60} 
            x={margin.left} 
            textAnchor="end" 
            transform={`translate(${[width - margin.right, plotHeight / 2]})rotate(-90)`}
        >
            Pulse /min
        </text>
        <g 
            className="pulseAxis" 
            transform={`translate(${width - margin.right}, 0)`} 
            ref={axis} 
        />
    </>
}
