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

        return { ...node, isExpanded: true, children };
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

  const addFolder = (
    nodes: FolderStructure[],
    targetNode: FolderStructure,
    folderName: string
  ): FolderStructure[] => {
    return nodes.map((node) => {
      if (node.id === targetNode.id) {
        const newFileObject: FolderStructure = {
          id: Math.random().toString(36).slice(2),
          name: folderName,
          isFolder: true,
          isExpanded: false,
          children: [],
        };
        const children = node?.children
          ? [...node.children, newFileObject]
          : [newFileObject];

        return { ...node, children };
      }

      if (!!node?.children?.length) {
        return {
          ...node,
          children: addFolder(node.children, targetNode, folderName),
        };
      }

      return node;
    });
  };

  // const deleteNode = (
  //   nodes: FolderStructure[],
  //   targetNode: FolderStructure
  // ): FolderStructure[] => {
  //   return nodes
  //     .filter((node) => node.id !== targetNode.id)
  //     .map((node) =>
  //       node.children?.length
  //         ? { ...node, children: deleteNode(node.children, targetNode) }
  //         : node
  //     );
  // };

  const deleteNode = (
    nodes: FolderStructure[],
    targetNode: FolderStructure
  ): FolderStructure[] => {
    return nodes.reduce<FolderStructure[]>((acc, node) => {
      if (node.id === targetNode.id) {
        return acc;
      }
      if (node?.children?.length) {
        acc.push({ ...node, children: deleteNode(node.children, targetNode) });
      } else {
        acc.push(node);
      }

      return acc;
    }, []);
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
          {
            const message = "Enter the folder name";
            const res = prompt(message);
            if (res) {
              setData((prev) => addFolder(prev, targetNode, res));
            }
          }
          break;
        case DataActions.DELETE_FOLDER:
          {
            const message = `Do you want to delete ${targetNode.name}?`;
            if (window.confirm(message)) {
              setData((prev) => deleteNode(prev, targetNode));
            }
          }
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
