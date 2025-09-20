import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [timerID, setTimerID] = useState();
  const [hrs, setHrs] = useState();
  const [min, setMin] = useState();
  const [sec, setSec] = useState();
  const handleInput = (e) => {
    if (e.target.id === "hours") setHrs(parseInt(e.target.value));
    else if (e.target.id === "minutes") setMin(parseInt(e.target.value));
    else if (e.target.id === "seconds") setSec(parseInt(e.target.value));
  };

  const decrementTime = () => {
    let s = sec,
      m = min,
      h = hrs;
    s -= 1;
    if (s < 0) {
      s = 59;
      m -= 1;
    }
    if (m < 0) {
      m = 59;
      h -= 1;
    }
    if (h < 0) {
      h = m = s = 0;
    }
    setSec(s);
    setMin(m);
    setHrs(h);
  };

  const runTimer = () => {
    let currentTimerID = setTimeout(() => decrementTime(), 1000);
    setTimerID(currentTimerID);
  };

  const handleStart = () => {
    if (!hrs && !min && !sec) {
      alert("Enter values for the timer");
      return;
    }
    setIsTimerOn(true);
  };

  const handlePause = () => {
    clearTimeout(timerID);
  };

  const handleReset = () => {
    setHrs(0);
    setMin(0);
    setSec(0);
    handlePause();
    setIsTimerOn(false);
  };

  useEffect(() => {
    if (isTimerOn && (hrs || min || sec)) {
      runTimer();
    }
  }, [isTimerOn, hrs, min, sec]);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div className="input-container">
        <div className="input-box">
          <input
            id="hours"
            placeholder="HH"
            onChange={handleInput}
            value={hrs ?? "HH"}
          />
          <input
            id="minutes"
            placeholder="MM"
            onChange={handleInput}
            value={min ?? "MM"}
          />
          <input
            id="seconds"
            placeholder="SS"
            onChange={handleInput}
            value={sec ?? "SS"}
          />
        </div>
        {!isTimerOn ? (
          <button onClick={handleStart} className="timer-button">
            Start
          </button>
        ) : (
          <div className="footer-button">
            <button id="pause-btn" onClick={handlePause}>
              Pause
            </button>
            <button id="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
