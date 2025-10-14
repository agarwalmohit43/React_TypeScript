import { useState } from "react";
import TaggingArea from "./TaggingArea";
import { debounce } from "../../helpers";
import TagInput from "./TagInput";

const FacebookTagging = () => {
  const [data, setData] = useState<any[]>([]);
  const [cordinates, setCordinates] = useState({ x: 0, y: 0 });
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagName, setTagName] = useState("");
  const handleMouseOver = (e: React.MouseEvent<any>) => {};

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

  console.log(data);

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
    </div>
  );
};

export default FacebookTagging;
