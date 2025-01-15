"use client"

import type { ScaleLinear } from "d3-scale";

const systolicBands = [
    { min: 210, max: 240, color: "#F52804", label: "Very Severe Stage 4" },
    { min: 180, max: 210, color: "#F6675F", label: "Severe Stage 3" },
    { min: 160, max: 180, color: "#F9ACA9", label: "Moderate Stage 2" },
    { min: 140, max: 160, color: "#FCD7D5", label: "Mild Stage 1" },
    { min: 90, max: 140, color: "#D5FDD5" },
    { min: 50, max: 90, color: "#FCD7F1" }
];

type Props = {
    bandwidth: number;
    margin: {
        left: number;
    },
    scale: ScaleLinear<number, number>
}

/**
 * Displays banding information over the Systolic axis
 */
export const SystolicBands = ({ margin, bandwidth, scale }: Props) => {
    return <g className="systolicBands">
        {systolicBands.map(band =>
            <g key={band.min}>
                <rect 
                    className="band"
                    x={margin.left - bandwidth}  
                    y={scale(band.max)}
                    width={bandwidth}
                    height={scale(band.min) - scale(band.max)}
                    fill={band.color}
                />
                {band.label && 
                    <text
                        className="bandLabel"
                        x={margin.left - bandwidth}
                        y={scale(band.min) + ((scale(band.max) - scale(band.min)) / 2)}
                        textAnchor="end"
                        dx={-20}
                        alignmentBaseline="central"
                    >
                        {band.label}
                    </text>
                }
            </g>)
        }
    </g>;
}
