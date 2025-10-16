import { useCallback, useState } from "react";
import { initialValue } from "../../constants/chipsTag";
import "./styles.css";
import ChipsItem from "./ChipsItem";
import { ChipsTagInterface } from "../../typings/chipsTag";

const ChipsTag = () => {
  const [data, setData] = useState<ChipsTagInterface[]>(initialValue);
  const [tagName, setTagName] = useState<string>("");

  const handleDelete = useCallback((id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleOnChangeTagname = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event?.target.value.trim();
    setTagName(value);
  };

  const handleAddTag = () => {
    if (tagName) {
      const newChip = {
        id: Math.random().toString(),
        tagName,
      };
      setData((prev) => [...prev, newChip]);
    }
  };

  return (
    <div className="chips-item-container">
      ChipsTag
      <div className="chips-item-input-container">
        <input
          name="tagname-input"
          type="text"
          value={tagName}
          onChange={handleOnChangeTagname}
        />
        <button onClick={handleAddTag} disabled={!tagName}>
          Add
        </button>
      </div>
      <div className="chips-item-display">
        {data.length > 0
          ? data.map((item: ChipsTagInterface) => {
              return (
                <ChipsItem
                  key={item.id}
                  {...item}
                  handleDelete={handleDelete}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ChipsTag;
