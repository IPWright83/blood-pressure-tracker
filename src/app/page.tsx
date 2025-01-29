import { BloodPressureChart } from "./ui/BloodPressureChart";
import { Meter } from "./ui/Meter";
import { AveragesChart } from "./ui/AveragesChart";

import "./page.css";

export default function Home() {
  const data = [
    { timestamp: new Date("2025-01-15T00:00:00.000Z"), sys: 142, dia: 96, pulse: 89 },
    { timestamp: new Date("2025-01-16T00:00:00.000Z"), sys: 152, dia: 84, pulse: 103 },
    { timestamp: new Date("2025-01-17T00:00:00.000Z"), sys: 102, dia: 79, pulse: 78 },
    { timestamp: new Date("2025-01-18T00:00:00.000Z"), sys: 120, dia: 96, pulse: 84 },
    { timestamp: new Date("2025-01-19T00:00:00.000Z"), sys: 140, dia: 116, pulse: 84 },
    { timestamp: new Date("2025-01-20T00:00:00.000Z"), sys: 110, dia: 106, pulse: 84 },
    { timestamp: new Date("2025-01-21T00:00:00.000Z"), sys: 135, dia: 99, pulse: 84 },
    { timestamp: new Date("2025-01-22T00:00:00.000Z"), sys: 147, dia: 87, pulse: 84 },
    { timestamp: new Date("2025-01-23T00:00:00.000Z"), sys: 158, dia: 77, pulse: 84 },
    { timestamp: new Date("2025-01-24T00:00:00.000Z"), sys: 125, dia: 75, pulse: 84 },
    { timestamp: new Date("2025-01-25T00:00:00.000Z"), sys: 140, dia: 82, pulse: 84 },
    { timestamp: new Date("2025-01-26T00:00:00.000Z"), sys: 147, dia: 89, pulse: 84 },
    { timestamp: new Date("2025-01-27T00:00:00.000Z"), sys: 138, dia: 93, pulse: 84 },
    { timestamp: new Date("2025-01-28T00:00:00.000Z"), sys: 128, dia: 103, pulse: 84 },
  ]

  return (
    <div className="page">
      <h1>Blood Pressure Tracker</h1>
      <p className="intro">This page is designed to help you track your blood pressure readings. No medical advise is provided and you should always consult your doctor.</p>
      <p className="intro"> Learn more about Blood Pressure at <a href="https://www.bloodpressureuk.org/your-blood-pressure/understanding-your-blood-pressure/what-do-the-numbers-mean/">Blood Pressure UK</a></p>
      <div className="content">
        <div className="innerContainer">
          <div className="measure"><Meter /></div>
          <div className="measure">
            <AveragesChart data={data} height={400} />
          </div>
        </div>
        <div className="measure">
          <BloodPressureChart height={800} data={data} />
        </div>
      </div>
    </div >
  );
}
