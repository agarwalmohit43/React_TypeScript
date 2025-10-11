import React from "react";
import useStopWatch from "../../hooks/useStopWatch";
const StopWatch = () => {
  const { timer, start, pause, reset, isRunning, resume } = useStopWatch();
  return (
    <div>
      StopWatch
      <h2>Start editing to see some magic happen!</h2>
      <div>
        <p>Hour: {Math.floor(timer / 60 / 60)}</p>
        <p>Minutes: {Math.floor(timer / 60)}</p>
        <p>Seconds {timer}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button onClick={start} disabled={isRunning}>
            Start
          </button>
          <button onClick={pause} disabled={!isRunning}>
            Pause
          </button>
          <button onClick={resume} disabled={isRunning}>
            Resume
          </button>
          <button onClick={reset} disabled={isRunning}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
