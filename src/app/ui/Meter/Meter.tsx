"use client"

import { useState } from "react";

import "./Meter.css";

// const toLocalISOString = (timestamp: number) => {
//     try {
//         const date = new Date(timestamp)
//         date.setSeconds(0);
//         date.setMilliseconds(0);
//         return date.toISOString().slice(0, -1);
//     } catch {
//         return toLocalISOString(Date.now());
//     }
// }

export const Meter = () => {
    const [sys, setSys] = useState(118);
    const [dia, setDia] = useState(78);
    const [pulse, setPulse] = useState(90);

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
            </div>
            <div className="caveat">
                No data is stored on our servers
            </div>
            <div className="buttonContainer">
                <button>Add Historical Reading</button>
                <button className="record">RECORD</button>
            </div>
        </div >
    );
}
