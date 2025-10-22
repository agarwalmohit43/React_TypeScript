import { useCallback, useState } from "react";
import jsonData from "../../mockData/nestedCheckbox.json";
import { CheckBoxDataType } from "../../typings/nestedCheckbox";
import CheckboxList from "./CheckboxList";
import "./styles.css";

const NestedCheckBox = () => {
  const [data, setData] = useState<CheckBoxDataType[]>(jsonData);

  const setAllChildren = (
    node: CheckBoxDataType,
    isChecked: boolean
  ): CheckBoxDataType => {
    return {
      ...node,
      isChecked: isChecked,
      children: node?.children?.map((childNode) =>
        setAllChildren(childNode, isChecked)
      ),
    };
  };

  const updateNode = (
    nodes: CheckBoxDataType[],
    targetNode: CheckBoxDataType
  ): CheckBoxDataType[] => {
    return nodes.map((node) => {
      if (node.id === targetNode.id) {
        const newCheckedValue = !node.isChecked;

        const updatedChildren = node?.children?.map((childNode) =>
          setAllChildren(childNode, newCheckedValue)
        );

        return {
          ...node,
          isChecked: newCheckedValue,
          children: updatedChildren,
        };
      }
      if (!!node?.children?.length) {
        const children = updateNode(node.children, targetNode);
        return children === node.children ? node : { ...node, children };
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
