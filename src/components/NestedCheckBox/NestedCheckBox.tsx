import { useState } from "react";
import jsonData from "../../mockData/nestedCheckbox.json";
import { CheckBoxDataType } from "../../typings/nestedCheckbox";
import CheckboxList from "./CheckboxList";
import "./styles.css";

const NestedCheckBox = () => {
  const [data, setData] = useState<CheckBoxDataType[]>(jsonData);
  return (
    <div>
      NestedCheckBox
      <CheckboxList data={data} setData={setData} />
    </div>
  );
};

export default NestedCheckBox;
