import { useCallback, useState } from "react";
import jsonData from "../../mockData/nestedCheckbox.json";
import { CheckBoxDataType } from "../../typings/nestedCheckbox";
import CheckboxList from "./CheckboxList";
import "./styles.css";

const NestedCheckBox = () => {
  const [data, setData] = useState<CheckBoxDataType[]>(jsonData);

  const setAllChildren = (
    node: CheckBoxDataType,
    newValue: boolean
  ): CheckBoxDataType => {
    if (node?.children?.length) {
      return {
        ...node,
        isChecked: newValue,
        children: node.children.map((childNode) =>
          setAllChildren(childNode, newValue)
        ),
      };
    }
    return { ...node, isChecked: newValue };
  };

  const updateNode = (
    nodes: CheckBoxDataType[],
    targetNode: CheckBoxDataType
  ): CheckBoxDataType[] => {
    return nodes.map((node) => {
      if (node.id === targetNode.id) {
        const newValue = !node.isChecked;

        if (node?.children?.length) {
          const updateChildrens = node.children.map((childrenNode) =>
            setAllChildren(childrenNode, newValue)
          );

          return {
            ...node,
            isChecked: !node.isChecked,
            children: updateChildrens,
          };
        }
        return { ...node, isChecked: newValue };
      }

      if (node?.children?.length) {
        return { ...node, children: updateNode(node?.children, targetNode) };
      }

      return node;
    });
  };

  const handleDataUpdate = useCallback((targetNode: CheckBoxDataType) => {
    setData((prev) => updateNode(prev, targetNode));
  }, []);

  return (
    <div>
      NestedCheckBox
      <CheckboxList data={data} handleDataUpdate={handleDataUpdate} />
    </div>
  );
};

export default NestedCheckBox;
