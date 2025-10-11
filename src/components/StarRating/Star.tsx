import React from "react";

interface StarProps {
  isFilled?: boolean;
  handleStarClick: (index: number) => void;
  index: number;
}

const Star = ({ isFilled = false, handleStarClick, index }: StarProps) => {
  console.log("Rendered", index);

  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        background: `${isFilled ? "yellow" : "white"}`,
        border: "1px solid black",
        cursor: "pointer",
      }}
      onClick={() => handleStarClick(index)}
    ></div>
  );
};

export default React.memo(Star);
