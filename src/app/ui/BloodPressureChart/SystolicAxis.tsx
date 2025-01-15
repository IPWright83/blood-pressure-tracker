"use client"

import type { ScaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { useEffect, useRef } from "react";

type Props = {
    margin: {
        left: number;
    },
    scale: ScaleLinear<number, number>
}

/**
 * Renders an Axis for the Systolic measurements
 */
export const SystolicAxis = ({ scale, margin }: Props) => {
    const axis = useRef<SVGGElement>(null);

    useEffect(() => {
        if (axis.current) {
            select(axis.current).call(axisLeft(scale));
        }
    }, [scale])

    return <>
        <text y={15} x={margin.left} textAnchor="end" dx={40}>Systolic mm Hg</text>
        <g className="sysAxis" transform={`translate(${margin.left}, 0)`} ref={axis} />
    </>
}
