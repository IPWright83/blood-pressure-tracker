"use client"

import type { ScaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { axisRight } from "d3-axis";
import { useEffect, useRef } from "react";

type Props = {
    width: number;
    margin: {
        left: number;
        right: number;
    },
    scale: ScaleLinear<number, number>
}

/**
 * Renders an Axis for the Diastolic measurements
 */
export const DiastolicAxis = ({ width, scale, margin }: Props) => {
    const axis = useRef<SVGGElement>(null);

    useEffect(() => {
        if (axis.current) {
            select(axis.current).call(axisRight(scale));
        }
    }, [scale])

    return <>
        <text y={15} x={width - margin.right} dx={-40}>Diastolic mm Hg</text>
        <g className="diaAxis" transform={`translate(${width - margin.right}, 0)`} ref={axis} />
    </>
}
