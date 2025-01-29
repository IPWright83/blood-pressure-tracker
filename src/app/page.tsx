import Image from "next/image";

import { BloodPressureChart } from "./ui/BloodPressureChart";
import { Meter } from "./ui/Meter";
import "./page.css";

export default function Home() {
  return (
    <div className="page">
      <h1>Blood Pressure Tracker</h1>
      <p className="intro">This page is designed to help you track your blood pressure readings. No medical advise is provided and you should always consult your doctor.</p>
      <p className="intro"> Learn more about Blood Pressure at <a href="https://www.bloodpressureuk.org/your-blood-pressure/understanding-your-blood-pressure/what-do-the-numbers-mean/">Blood Pressure UK</a></p>
      <div className="container">
        <BloodPressureChart height={750} />
        <div className="meterContainer">
          <Meter />
          <Meter />
        </div>
      </div>
    </div >
  );
}
