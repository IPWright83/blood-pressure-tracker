"use client"

import { useState } from "react";
import Image from "next/image";

import "./Meter.css";

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

export const Meter = () => {
    const [sys, setSys] = useState(118);
    const [dia, setDia] = useState(78);
    const [pulse, setPulse] = useState(90);
    const [timestampVisible, setTimestampVisible] = useState(false)
    const [timestamp, setTimesamp] = useState(Date.now())

    const meterClass = "meter" + (timestampVisible ? " fullWidth" : "");
    const screenClass = "screen" + (timestampVisible ? " fullWidth" : "");

    return (
        <div className={meterClass}>
            <div className={screenClass}>
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
                            max="250" 
                            min="0" 
                            value={pulse} 
                            onChange={(e) => {
                                setPulse(+e.currentTarget.value)
                            }} 
                        />
                    </div>
                </div>
                {timestampVisible && 
                    <div className="reading">
                        <div className="key">
                            <div className="type">Time</div>
                        </div>
                        <div className="value">
                            <input 
                                type="datetime-local" 
                                value={toLocalISOString(timestamp)}
                                onChange={(e) => {
                                    setTimesamp(+new Date(e.currentTarget.value))
                                }} 
                            />
                        </div>
                    </div>
                }
            </div>
            <div className="caveat">
                No data is stored on our servers
            </div>
            <div className="buttonContainer">
                <button onClick={() => setTimestampVisible(!timestampVisible)}>
                    <Image
                        className="dark:invert"
                        src="/clock.svg"
                        alt="Toggle Date"
                        width={40}
                        height={40}
                    />
                </button>
                <button>RECORD</button>
            </div>
        </div >
    );
}
