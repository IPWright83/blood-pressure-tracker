type Props = {
    width: number;
}

export const Legend = ({ width }: Props) => {
    return <g className="legend" transform={`translate(${width / 2}, 40)`}>
        <g transform={`translate(40, 0)`}>
            <line x1="0" y1="0" x2="15" y2="0" stroke="steelblue" strokeWidth="2" />
            <text dx="20" dy="3">Sys (upper)</text>
        </g>
        <g transform={`translate(140, 0)`}>
            <line x1="0" y1="0" x2="15" y2="0" stroke="steelblue" strokeWidth="2" />
            <text dx="20" dy="3">Dia (lower)</text>
        </g>
        <g transform={`translate(240, 0)`}>
            <line x1="0" y1="0" x2="15" y2="0" stroke="red" strokeWidth="2" />
            <text dx="20" dy="3">Pulse</text>
        </g>
        <g transform={`translate(320, 0)`}>
            <rect x1="0" y1="0" width="15" height="10" fill="steelblue" opacity="0.5" transform="translate(0, -5)" />
            <text dx="20" dy="3">Normal Zone</text>
        </g>
    </g>
}
