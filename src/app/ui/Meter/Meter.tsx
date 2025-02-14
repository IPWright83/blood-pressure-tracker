"use client"

import { useState, useCallback, useRef } from "react";

import "./Meter.css";
import { IDatum } from "../../types";

type Props = {
    addReading: (datum: IDatum) => void;
}

const toLocalISOString = (timestamp: number) => {
    try {
        const date = new Date(timestamp)
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.toISOString().slice(0, -1);
    } catch {
        return toLocalISOString(Date.now());
    }
}

export const Meter = ({ addReading }: Props) => {
    const historyInput = useRef<HTMLInputElement>(null);

    const [sys, setSys] = useState(0);
    const [dia, setDia] = useState(0);
    const [pulse, setPulse] = useState(0);
    const [timestampVisible, setTimestampVisible] = useState(false)
    const [timestamp, setTimesamp] = useState<number>()

    const record = useCallback(() => {
        if (sys && dia && pulse) {
            const date = timestamp ? new Date(timestamp) : new Date();
            addReading({
                timestamp: date,
                sys,
                dia,
                pulse,
            });

            alert("Reading saved");
            setSys(0);
            setDia(0);
            setPulse(0);
            setTimesamp(undefined);
            setTimestampVisible(false);
        }
    }, [sys, dia, pulse, addReading, timestamp]);

    const recordHistorical = useCallback(() => {
        if (historyInput.current) {
            setTimestampVisible(true);
            historyInput.current.showPicker();
        }

    }, [historyInput])

    return (
        <div className="meter">
            <div className="screen">
                <div className="reading" title="Systolic blood pressure: This is the highest level your blood pressure reaches when your heat beats">
                    <div className="key">
                        <div className="type">SYS</div>
                        <div className="unit">mmHg</div>
                    </div>
                    <div className="value">
                        <input 
                            type="number" 
                            max="230" 
                            min="50" 
                            value={sys} 
                            onChange={(e) => {
                                setSys(+e.currentTarget.value)
                            }} 
                        />
                    </div>
                </div>
                <div className="reading" title="Diastolic blood pressure: This is the lowest level your blood pressure reaches when your heat relaxes">
                    <div className="key">
                        <div className="type">DIA</div>
                        <div className="unit">mmHg</div>
                    </div>
                    <div className="value">
                        <input 
                            type="number" 
                            max="140" 
                            min="0" 
                            value={dia} 
                            onChange={(e) => {
                                setDia(+e.currentTarget.value)
                            }} 
                        />
                    </div>
                </div>
                <div className="reading">
                    <div className="key">
                        <div className="type">PULSE</div>
                        <div className="unit">/min</div>
                    </div>
                    <div className="value">
                        <input 
                            type="number" 
                            max="200" 
                            min="0" 
                            value={pulse} 
                            onChange={(e) => {
                                setPulse(+e.currentTarget.value)
                            }} 
                        />
                    </div>
                </div>
                <input 
                    ref={historyInput}
                    type="datetime-local" 
                    value={toLocalISOString(timestamp ?? Date.now())}
                    onChange={(e) => {
                        setTimesamp(+new Date(e.currentTarget.value))
                    }} 
                    style={{ visibility: timestampVisible ? "visible" : "hidden" }}
                />
            </div>
            <div className="caveat">
                No data is stored on our servers
            </div>
            <div className="buttonContainer">
                <button onClick={recordHistorical}>Add Historical Reading</button>
                <button className="record" onClick={record}> RECORD</button>
            </div>
        </div >
    );
}
