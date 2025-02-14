"use client"

import { useState, useCallback } from "react";

import "./Meter.css";
import { IDatum } from "../../types";

type Props = {
    addReading: (datum: IDatum) => void;
}

export const Meter = ({ addReading }: Props) => {
    const [sys, setSys] = useState(0);
    const [dia, setDia] = useState(0);
    const [pulse, setPulse] = useState(0);

    const record = useCallback(() => {
        if (sys && dia && pulse) {
            addReading({
                timestamp: new Date(),
                sys,
                dia,
                pulse,
            });
        }
    }, [sys, dia, pulse]);

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
                <button className="record" onClick={record}> RECORD</button>
            </div>
        </div >
    );
}
