"use client"

import type { ScaleLinear } from "d3-scale";

const diastolicBands = [
    { min: 120, max: 140, color: "#F52804", label: "Very Severe Stage 4" },
    { min: 110, max: 120, color: "#F6675F", label: "Severe Stage 3" },
    { min: 100, max: 110, color: "#F9ACA9", label: "Moderate Stage 2" },
    { min: 90, max: 100, color: "#FCD7D5", label: "Mild Stage 1" },
    { min: 60, max: 90, color: "#D5FDD5" },
    { min: 35, max: 60, color: "#FCD7F1" }
];

type Props = {
    bandwidth: number;
    width: number;
    margin: {
        right: number;
    },
    scale: ScaleLinear<number, number>
}

/**
 * Displays banding information over the Diastolic axis
 */
export const DiastolicBands = ({ width, margin, bandwidth, scale }: Props) => {
    return <g className="diastolicBands">
        {diastolicBands.map(band => 
            <g key={band.min}>
                <rect 
                    x={width - margin.right}  
                    y={scale(band.max)}
                    width={bandwidth}
                    height={scale(band.min) - scale(band.max)}
                    opacity={0.3}
                    fill={band.color}
                />
                {band.label && 
                    <text
                        className="bandLabel"
                        x={width - margin.right + bandwidth}
                        y={scale(band.min) + ((scale(band.max) - scale(band.min)) / 2)}
                        dx={20}
                        alignmentBaseline="central"
                    >
                        {band.label}
                    </text>
                }
            </g>)
        }
    </g>;
}
