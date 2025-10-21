import React from "react";
import { Dispatch, SetStateAction } from "react";
import { CheckBoxDataType } from "../../typings/nestedCheckbox";

interface CheckboxListProps {
  data: CheckBoxDataType[];
  setData: Dispatch<SetStateAction<CheckBoxDataType[]>>;
}

const CheckboxList = ({ data, setData }: Readonly<CheckboxListProps>) => {
  const setAllChildren = (
    node: CheckBoxDataType,
    checked: boolean
  ): CheckBoxDataType => {
    return {
      ...node,
      isChecked: checked,
      children: node.children?.map((child) => setAllChildren(child, checked)),
    };
  };

  const updateNode = (
    data: CheckBoxDataType[],
    node: CheckBoxDataType
  ): CheckBoxDataType[] => {
    const recurse = (
      nodes: CheckBoxDataType[]
    ): [CheckBoxDataType[], boolean] => {
      const out: CheckBoxDataType[] = [];
      let didChange = false;

      for (const item of nodes) {
        if (item.id === node.id) {
          const newChecked = !item.isChecked;
          const updatedChildren = item.children?.map((c) =>
            setAllChildren(c, newChecked)
          );
          out.push({
            ...item,
            isChecked: newChecked,
            children: updatedChildren,
          });
          didChange = true;
        } else if (item.children?.length) {
          const [updatedChildren, childChanged] = recurse(item.children);

          if (childChanged) {
            out.push({ ...item, children: updatedChildren });
            didChange = true;
          } else {
            out.push(item);
          }
        } else {
          out.push(item);
        }
      }

      return [out, didChange];
    };

    return recurse(data)[0];
  };

  const handleCheckboxChange = (node: CheckBoxDataType) => {
    setData((prev) => updateNode(prev, node));
  };

  return (
    <div className="container">
      {!!data.length &&
        data.map((node: CheckBoxDataType) => {
          const { name = "", id = "", isChecked = false, children = [] } = node;
          return (
            <div key={id + name} className="parent-div">
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
                  <CheckboxList data={children} setData={setData} />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CheckboxList;
