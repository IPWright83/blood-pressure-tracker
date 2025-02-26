import useResizeObserver from '@react-hook/resize-observer';
import { MutableRefObject, useRef, useState, useLayoutEffect } from "react";
import { IMargin } from '../types';

class ServerSideResizeObserverPolyfill {
    constructor() {}
    observe() {}
    unobserve() {}
}

export const useTargetWidth = (margin: IMargin): [MutableRefObject<HTMLDivElement | null>, number] => {
    const target = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>(margin.left + margin.right + 500);

    // Handle the initial size
    useLayoutEffect(() => {
        if (target.current) {
            setWidth(target.current.clientWidth);
        }
    }, [target]);

    // Handle updates to the size
    useResizeObserver(target, entry => {
        const { inlineSize: width } = entry.contentBoxSize[0];
        setWidth(Math.round(width))
    }, {
        polyfill: typeof window === 'undefined' ? ServerSideResizeObserverPolyfill : null
    });

    return [target, width]
}
