import Progress from "./Progress";
import "./styles.css";

const ProgressBar = () => {
  const progress = [1, 5, 10, 15, 30, 50, 75, 100];

  return (
    <div>
      ProgressBar
      {progress.map((progress) => (
        <Progress progressPercentage={progress} />
      ))}
    </div>
  );
};

export default ProgressBar;
