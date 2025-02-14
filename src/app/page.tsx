"use client";

import { useCallback, useEffect, useState } from "react";

import { BloodPressureChart } from "./ui/BloodPressureChart";
import { Meter } from "./ui/Meter";
import { AveragesChart } from "./ui/AveragesChart";
import { useLocalStorage } from "./ui/useLocalStorage";

import "./page.css";
import { IDatum } from "./types";

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [_data, setData] = useLocalStorage("data");

  useEffect(() => {
    setIsClient(true)
  }, [])

  const addReading = useCallback((datum: IDatum) => {
    setData([..._data, datum])
  }, [_data, setData])

  const data = isClient ? _data : [];

  return (
    <div style={{ width: "100%", height: "100%", padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h1>Blood Pressure Tracker</h1>
        <p style={{ textAlign: "center" }}>
          This page is designed to help you track your blood pressure readings. No medical advise is provided and you should always consult your doctor. 
          <br />Learn more about Blood Pressure at&nbsp;
          <a href="https://www.bloodpressureuk.org/your-blood-pressure/understanding-your-blood-pressure/what-do-the-numbers-mean/">
            Blood Pressure UK
          </a>
        </p>
      </div>
      <div className="row">
        <div className="column">
          <div style={{ width: "100%", justifyItems: "center", marginBottom: 20 }}>
            <Meter addReading={addReading} />
          </div>
          <AveragesChart data={data} height={400} />
        </div>
        <div className="column">
          <BloodPressureChart height={800} data={data} />
        </div>
      </div>
    </div >
  );
}
