import { useCallback, useState } from "react";
import fileExplorerJSON from "../../mockData/fileExplorer2.json";
import "./styles.css";
import List from "./List";
import { FolderStructure } from "../../typings/fileExplorer2";
import { DataActions } from "../../constants/fileExplorer2";

const FileExplorer = () => {
  const [data, setData] = useState<FolderStructure[]>(fileExplorerJSON);

  const toggleExpansion = (
    nodes: FolderStructure[],
    targetNode: FolderStructure
  ): FolderStructure[] => {
    return nodes.map((node) => {
      if (node.id === targetNode.id) {
        return { ...node, isExpanded: !node.isExpanded };
      }

      if (!!node?.children?.length) {
        return {
          ...node,
          children: toggleExpansion(node.children, targetNode),
        };
      }

      return node;
    });
  };

  const addFile = (
    nodes: FolderStructure[],
    targetNode: FolderStructure,
    fileName: string
  ): FolderStructure[] => {
    return nodes.map((node) => {
      if (node.id === targetNode.id) {
        const newFileObject: FolderStructure = {
          id: Math.random().toString(36).slice(2),
          name: fileName,
          isFolder: false,
        };
        const children = node?.children
          ? [...node.children, newFileObject]
          : [newFileObject];

        return { ...node, children };
      }

      if (!!node?.children?.length) {
        return {
          ...node,
          children: addFile(node.children, targetNode, fileName),
        };
      }

      return node;
    });
  };

  const handleDataUpdate = useCallback(
    (targetNode: FolderStructure, action?: DataActions) => {
      switch (action) {
        case DataActions.TOGGLE_EXPAND:
          console.log(targetNode);
          setData((prev) => toggleExpansion(prev, targetNode));
          break;
        case DataActions.ADD_FILE:
          {
            const message = "Enter the file name";
            const res = prompt(message);
            if (res) {
              setData((prev) => addFile(prev, targetNode, res));
            }
          }
          break;
        case DataActions.ADD_FOLDER:
          break;
        case DataActions.DELETE_FOLDER:
          break;
        default:
          break;
      }
    },
    []
  );

  return (
    <div>
      FileExplorer
      <List data={data} handleDataUpdate={handleDataUpdate} />
    </div>
  );
};

export default FileExplorer;
