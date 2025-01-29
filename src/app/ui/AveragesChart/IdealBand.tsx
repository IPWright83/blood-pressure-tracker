import type { ScaleLinear } from "d3-scale";

import { IMargin } from "../../types";

type Props = {
    width: number;
    height: number;
    margin: IMargin,
    scale: ScaleLinear<number, number>
}

export const IdealBand = ({ width, height, margin, scale }: Props) => (
    <rect
        className="idealBand"
        x={margin.left}
        y={scale(120)}
        width={width - margin.left - margin.right}
        height={scale(80) - scale(120)}
    />
)

