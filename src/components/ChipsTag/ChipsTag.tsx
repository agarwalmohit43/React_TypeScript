import { useState } from "react";
import { initialValue } from "../../constants/chipsTag";
import "./styles.css";
import ChipsItem from "./ChipsItem";
import { ChipsTagInterface } from "../../typings/chipsTag";

const ChipsTag = () => {
  const [data, setData] = useState(initialValue);

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div>
      ChipsTag
      <div className="chips-item-input"></div>
      <div className="chips-item-display">
        {data.length > 0
          ? data.map((item: ChipsTagInterface) => {
              return <ChipsItem {...item} handleDelete={handleDelete} />;
            })
          : null}
      </div>
    </div>
  );
};

export default ChipsTag;
