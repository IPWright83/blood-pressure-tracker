import type { ScaleLinear } from "d3-scale";

type Props = {
    avgSys: number;
    avgDia: number;
    width: number;
    margin: {
        left: number;
        right: number;
    },
    systolicScale: ScaleLinear<number, number>
    diastolicScale: ScaleLinear<number, number>
}

export const AverageReading = ({ avgSys, avgDia, systolicScale, diastolicScale, width, margin }: Props) => (
    <line className="averageReading"
        x1={margin.left}
        x2={width - margin.right}
        y1={systolicScale(avgSys)}
        y2={diastolicScale(avgDia)}
    />
);
