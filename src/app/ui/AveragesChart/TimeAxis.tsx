"use client"

import type { ScaleTime } from "d3-scale";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { useEffect, useRef } from "react";

import { IMargin } from "../../types";

type Props = {
    height: number;
    width: number;
    margin: IMargin,
    scale: ScaleTime<number, number>
}

/**
 * Renders an Axis for the timestamps
 */
export const TimeAxis = ({ scale, width, height, margin }: Props) => {
    const axis = useRef<SVGGElement>(null);

    const plotHeight = height - margin.bottom;
    const plotWidth = width - margin.left - margin.right;

    useEffect(() => {
        if (axis.current) {
            select(axis.current).call(axisBottom(scale));
        }
    }, [scale])

    return <>
        <text 
            y={50} 
            x={margin.left} 
            textAnchor="end" 
            dx={40} 
            transform={`translate(${[plotWidth / 2, plotHeight]})`}
        >   Measurement Date
        </text>
        <g 
            className="timeAxis" 
            transform={`translate(${[0, plotHeight]})`} 
            ref={axis} 
        />
    </>
}
