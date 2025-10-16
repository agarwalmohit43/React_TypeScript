import React from "react";
import { ChipsTagInterface } from "../../typings/chipsTag";

type ChipsItemProps = ChipsTagInterface & {
  handleDelete: (id: string) => void;
};

const ChipsItem = ({ id, tagName, handleDelete }: Readonly<ChipsItemProps>) => {
  return (
    <div className="chips-item">
      {tagName}
      <button onClick={() => handleDelete(id)}>X</button>
    </div>
  );
};

export default React.memo(ChipsItem);
