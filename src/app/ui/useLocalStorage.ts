"use client";

import { useState, useEffect } from "react";
import type { IData } from "../types";

const getStorageValue = (key: string): IData => {
    let data;

    try {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(key);
            data = JSON.parse(saved ?? "");
        }
    } catch (e) {
        console.error(e);
    }

    return data || [
        // { timestamp: new Date("2025-01-15T00:00:00.000Z"), sys: 142, dia: 96, pulse: 89 },
        // { timestamp: new Date("2025-01-16T00:00:00.000Z"), sys: 152, dia: 84, pulse: 103 },
        // { timestamp: new Date("2025-01-17T00:00:00.000Z"), sys: 102, dia: 79, pulse: 78 },
        // { timestamp: new Date("2025-01-18T00:00:00.000Z"), sys: 120, dia: 96, pulse: 84 },
        // { timestamp: new Date("2025-01-19T00:00:00.000Z"), sys: 140, dia: 116, pulse: 84 },
        // { timestamp: new Date("2025-01-20T00:00:00.000Z"), sys: 110, dia: 106, pulse: 84 },
        // { timestamp: new Date("2025-01-21T00:00:00.000Z"), sys: 135, dia: 99, pulse: 84 },
        // { timestamp: new Date("2025-01-22T00:00:00.000Z"), sys: 147, dia: 87, pulse: 84 },
        // { timestamp: new Date("2025-01-23T00:00:00.000Z"), sys: 158, dia: 77, pulse: 84 },
        // { timestamp: new Date("2025-01-24T00:00:00.000Z"), sys: 125, dia: 75, pulse: 84 },
        // { timestamp: new Date("2025-01-25T00:00:00.000Z"), sys: 140, dia: 82, pulse: 84 },
        // { timestamp: new Date("2025-01-26T00:00:00.000Z"), sys: 147, dia: 89, pulse: 84 },
        // { timestamp: new Date("2025-01-27T00:00:00.000Z"), sys: 138, dia: 93, pulse: 84 },
        // { timestamp: new Date("2025-01-28T00:00:00.000Z"), sys: 128, dia: 103, pulse: 84 },
    ];
    
}

export const useLocalStorage = (key: string): [IData, (data: IData) => void] => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key).map(item => ({ ...item, timestamp: new Date(item.timestamp) }));
    });

    // Update local storage whenever the value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value]);

    return [value, setValue];
}
