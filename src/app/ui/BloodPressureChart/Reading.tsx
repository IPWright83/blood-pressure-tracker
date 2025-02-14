import type { ScaleLinear } from "d3-scale";

type Props = {
    sys: number;
    dia: number;
    width: number;
    margin: {
        left: number;
        right: number;
    },
    systolicScale: ScaleLinear<number, number>
    diastolicScale: ScaleLinear<number, number>
}

export const Reading = ({ sys, dia, systolicScale, diastolicScale, width, margin }: Props) => {
    console.log({ sys, dia });

    return (<line className="reading"
        x1={margin.left}
        x2={width - margin.right}
        y1={systolicScale(sys)}
        y2={diastolicScale(dia)}
    />
    );
}
