import { useEffect, useState } from "react";

interface ProgressProps {
  progressPercentage: number;
}

const Progress = ({ progressPercentage }: Readonly<ProgressProps>) => {
  const [progressAni, setProgressAni] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgressAni(progressPercentage), 1000);
  }, [progressPercentage]);

  return (
    <div className="outerDiv">
      <div
        className="innerDiv"
        style={{
          //   width: `${progressPercentage}%`,
          color: progressAni < 5 ? "black" : "white",

          transform: `translateX(${progressAni - 100}%)`,
        }}
        role="progressbar"
        aria-valuenow={progressPercentage}
        aria-valuemax={100}
        aria-valuemin={0}
      >
        {`${progressPercentage}${progressPercentage > 2 ? "%" : ""}`}
      </div>
    </div>
  );
};

export default Progress;
