import { useState } from "react";
import TaggingArea from "./TaggingArea";
import { debounce } from "../../helpers";
import TagInput from "./TagInput";

const FacebookTagging = () => {
  const [data, setData] = useState<any[]>([]);
  const [cordinates, setCordinates] = useState({ x: 0, y: 0 });
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagName, setTagName] = useState("");
  const [hoveredTag, setHoveredTag] = useState<any | null>(null); // 🆕 for floating div

  const handleMouseOver = (e: React.MouseEvent<any>) => {
    const tolerance = 15; // distance threshold for hover detection
    const foundTag = data.find((tag) => {
      const [x, y] = tag.dataKey
        .replace("x:", "")
        .replace("y:", "")
        .split(",")
        .map((v: string) => parseFloat(v));

      return (
        Math.abs(e.clientX - x) < tolerance &&
        Math.abs(e.clientY - y) < tolerance
      );
    });

    if (foundTag) {
      setHoveredTag({
        ...foundTag,
        x: e.clientX,
        y: e.clientY,
      });
    } else {
      setHoveredTag(null);
    }
  };

  const handleAreaClick = (e: React.MouseEvent<any>) => {
    setCordinates({ x: e.clientX, y: e.clientY });
    setShowTagInput(true);
  };

  const debouncedMouseOver = debounce(handleMouseOver, 500);

  const handleAddTag = (e: any) => {
    if (tagName && cordinates["x"] && cordinates["y"]) {
      let dataKey = "x:" + cordinates["x"] + ",y:" + cordinates["y"];
      setData((prev: any) => [...prev, { tagName, dataKey }]);
      setShowTagInput(false);
      setCordinates({ x: 0, y: 0 });
      setTagName("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      FacebookTagging
      <TaggingArea
        handleMouseOver={debouncedMouseOver}
        handleAreaClick={handleAreaClick}
      />
      {showTagInput && (
        <TagInput
          tagName={tagName}
          setTagName={setTagName}
          handleAddTag={handleAddTag}
        />
      )}
      {data.length > 0
        ? data.map((cords: any) => {
            return (
              <li key={cords?.dataKey}>
                {`Name: ${cords.tagName} tagged at location: ${cords?.dataKey}`}
              </li>
            );
          })
        : null}
      {/* 🧠 Floating Div on Hover */}
      {hoveredTag && (
        <div
          style={{
            position: "fixed",
            top: hoveredTag.y + 15,
            left: hoveredTag.x + 15,
            background: "white",
            border: "1px solid #ddd",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "8px 12px",
            pointerEvents: "none",
            transition: "opacity 0.2s ease",
            zIndex: 999,
          }}
        >
          👋 Hello World — {hoveredTag.tagName}
        </div>
      )}
    </div>
  );
};

export default FacebookTagging;
