import React, { useCallback, useState } from "react";
import Star from "./Star";

const StarRating = () => {
  const length = 5;
  const [starData, setStarData] = useState(Array(length).fill(0));

  const handleStarClick = useCallback((index: number) => {
    setStarData((prev) => {
      return prev.map((item, currIndex) => (currIndex <= index ? 1 : 0));
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      StarRating
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {starData.map((item, index) => {
          return (
            <Star
              key={`${item}-${index}`}
              isFilled={!!item}
              handleStarClick={handleStarClick}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
