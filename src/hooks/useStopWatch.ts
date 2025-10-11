import { useEffect, useState, useRef } from "react";

const useStopWatch = (initialTime = 0) => {
  const [timer, setTimer] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const start = () => {
    if (timerId.current != undefined) return;
    setIsRunning(true);
    timerId.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const pause = () => {
    if (timerId.current === undefined) return;
    setIsRunning(false);
    clearInterval(timerId.current as unknown as number);
    timerId.current = undefined;
  };

  const reset = () => {
    setTimer(initialTime);
  };

  const stop = () => {
    pause();
    setTimer(0);
  };

  const resume = () => {
    start();
  };

  useEffect(() => {
    return () => {
      if (timerId.current !== undefined) {
        window.clearInterval(timerId.current);
        timerId.current = undefined;
      }
    };
  }, []);

  return { timer, start, pause, stop, reset, isRunning, resume };
};

export default useStopWatch;
