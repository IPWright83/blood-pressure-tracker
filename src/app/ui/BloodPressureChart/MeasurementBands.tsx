import type { ScaleLinear } from "d3-scale";

const measurementBands = [
    { sysMin: 140, sysMax: 230, diaMin: 90, diaMax: 135, color: "#FCD7D5" },
    { sysMin: 130, sysMax: 140, diaMin: 85, diaMax: 90, color: "#FEF9D6", label: { text: "High Normal", angle: 8, dx: -65, dy: 30 } },
    { sysMin: 100, sysMax: 130, diaMin: 65, diaMax: 90, color: "#D5FDD5", label: { text: "Normal", angle: 10, dx: -85, dy: 30 } },
    { sysMin: 90, sysMax: 100, diaMin: 60, diaMax: 65, color: "#D6F4FF", label: { text: "Low Normal", angle: 13, dx: -120, dy: 40 } },
    { sysMin: 50, sysMax: 90, diaMin: 35, diaMax: 60, color: "#FCD7F1" }
];

type Props = {
    width: number;
    bandwidth: number;
    margin: {
        left: number;
        right: number;
    },
    systolicScale: ScaleLinear<number, number>
    diastolicScale: ScaleLinear<number, number>
}

export const MeasurementBands = ({ margin, width, systolicScale, diastolicScale, bandwidth }: Props) => {
    return <g className="measurementBands">
        {measurementBands.map(band => 
            <g key={band.sysMin}>
                <path 
                    fill={band.color}
                    d={`M ${margin.left} ${systolicScale(band.sysMax)} 
                        L ${width - margin.right} ${diastolicScale(band.diaMax)} 
                        L ${width - margin.right} ${diastolicScale(band.diaMin)} 
                        L ${margin.left} ${systolicScale(band.sysMin)}
                        Z`}
                />
                {band.label && 
                    <text 
                        className="measurementBandLabel"
                        x={margin.left + bandwidth}
                        y={systolicScale(band.sysMin) + ((systolicScale(band.sysMax) - systolicScale(band.sysMin)) / 2)}
                        dy={band.label.dy}
                        dx={band.label.dx}
                        transform={`rotate(-${band.label.angle})`}
                    >
                        {band.label.text}
                    </text>
                }
            </g>
        )}
    </g>
}
