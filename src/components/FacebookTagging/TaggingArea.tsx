import React from "react";

interface TaggingAreaProps {
  handleMouseOver?: (event: React.MouseEvent<any>) => void;
  handleAreaClick?: (event: React.MouseEvent<any>) => void;
}

const TaggingArea = ({
  handleMouseOver,
  handleAreaClick,
}: Readonly<TaggingAreaProps>) => {
  return (
    <div
      onMouseOver={handleMouseOver}
      onClick={handleAreaClick}
      style={{ width: "100px", height: "100px", backgroundColor: "grey" }}
    ></div>
  );
};

export default TaggingArea;
