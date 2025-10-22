import React, { useMemo } from "react";
import { Dispatch, SetStateAction } from "react";
import { CheckBoxDataType } from "../../typings/nestedCheckbox";

interface CheckboxListProps {
  data: CheckBoxDataType[];
  handleDataUpdate: (node: CheckBoxDataType) => void;
}

const CheckboxList = ({
  data,
  handleDataUpdate,
}: Readonly<CheckboxListProps>) => {
  const handleCheckboxChange = (node: CheckBoxDataType) => {
    handleDataUpdate(node);
  };

  console.log("rerendered", data);

  return (
    <div className="container">
      {!!data.length &&
        data.map((node: CheckBoxDataType) => {
          const { name = "", id = "", isChecked = false, children = [] } = node;
          return (
            <div key={id} className="parent-div">
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  id={id}
                  onChange={() => handleCheckboxChange(node)}
                />
                <label htmlFor={id}>{name}</label>
              </div>
              {!!children.length && (
                <div className="children-div" key={id}>
                  <CheckboxList
                    data={children}
                    handleDataUpdate={handleDataUpdate}
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(CheckboxList);
