// typings
import { StickyNoteData } from "../../typings/stickyNotes";
// mock data
import jsonData from "../../mockData/stickyNotes.json";
// module
import { useState } from "react";
// components
import Sticky from "./Sticky";
// styles
import "./styles.css";

const StickyNotes = () => {
  const [data, setData] = useState<StickyNoteData[]>(jsonData);
  const [message, setMessage] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value.trim();
    if (value) {
      setMessage(value);
    }
  };

  const handleAddMessage = () => {
    setData((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2), message },
    ]);
    setMessage("");
  };

  return (
    <div>
      StickyNotes
      <div className="sticky-input">
        <input type="text" onChange={handleChange} value={message} />
        <button onClick={handleAddMessage}>Add Note</button>
      </div>
      <div className="sticky-container">
        {!!data.length &&
          data.map((item) => <Sticky key={item.id} data={item} />)}
      </div>
    </div>
  );
};

export default StickyNotes;
