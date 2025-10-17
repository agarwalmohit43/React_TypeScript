import {
  InterestsData,
  TabFormChildComponentProps,
} from "../../../typings/tabForm";

// CheckboxItem.tsx
import React from "react";
type CheckboxItemProps = {
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
};

const CheckboxItem = React.memo(
  ({ name, checked, onChange }: Readonly<CheckboxItemProps>) => {
    return (
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(event) => onChange(event, name)}
        />
        {name}
      </label>
    );
  }
);

const Interests = ({ data, setData }: Readonly<TabFormChildComponentProps>) => {
  const { interests } = data;
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const checked = event.target.checked;

    setData((prev) => ({
      ...prev,
      interests: prev.interests.map((item) =>
        item.name === type
          ? {
              name: type,
              isChecked: checked,
            }
          : item
      ),
    }));
  };
  return (
    <div>
      Interests
      <div>
        {interests.map((item: InterestsData) => {
          const { name, isChecked } = item;
          return (
            <CheckboxItem
              key={name}
              name={name}
              checked={isChecked}
              onChange={handleChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Interests;
