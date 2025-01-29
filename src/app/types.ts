export interface IMargin {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

export interface IDatum {
    timestamp: Date;
    sys: number;
    dia: number;
    pulse: number;
}

export type IData = IDatum[];
