import { Dispatch, SetStateAction, useState } from "react";
import { FolderStructure } from "../../typings/fileExplorer";
import React from "react";

interface ListProps {
  data: FolderStructure[];
  setData: Dispatch<SetStateAction<FolderStructure[]>>;
}

const List = ({ data, setData }: Readonly<ListProps>) => {
  const [isExpanded, setIsExpanded] = useState<Record<string, string>>({});

  //   const recursiveGenerateUI = (dataArr: FolderStructure[]) => {
  //     const result = [];
  //     for (let val of dataArr) {
  //       if (val.isFolder) {
  //         result.push(
  //           <div className="parent-divs" key={val.id}>
  //             <span className="plus-icon">{`+`}</span>
  //             <span>{val.name}</span>
  //             {val?.children && val.children.length && (
  //               <div className="children-divs">
  //                 {recursiveGenerateUI(val?.children)}
  //               </div>
  //             )}
  //           </div>
  //         );
  //       } else {
  //         result.push(
  //           <div className="parent-divs" key={val.id}>
  //             <span>{val.name}</span>
  //           </div>
  //         );
  //       }
  //     }

  //     return result;
  //   };

  const handleActionButtonsClick = (
    event: React.MouseEvent<HTMLDivElement>,
    node: FolderStructure,
    index: number
  ) => {
    const target = event.target as HTMLElement;
    const action = target.dataset.action;
    console.log(action, node);
    switch (action) {
      case "add-file":
        {
          const message = "Enter File name";
          const fileName = prompt(message)?.trim();
          if (fileName) {
            const newNode = {
              id: Math.random().toString(36).slice(2),
              name: fileName,
              isFolder: false,
            };
            node?.children?.push(newNode);
            setData((prev) => {
              prev[index] = node;
              return [...prev];
            });
          }
        }
        break;
      case "add-folder":
        {
          const message = "Enter folder name";
          const folderName = prompt(message)?.trim();
          if (folderName) {
            const newNode = {
              id: Math.random().toString(36).slice(2),
              name: folderName,
              isFolder: true,
              children: [],
            };
            node?.children?.push(newNode);
            setData((prev) => {
              prev[index] = node;
              return [...prev];
            });
          }
        }
        break;
      case "delete":
        {
          const message = `Do you want to delete ${node?.name} folder?`;
          if (!window.confirm(message)) return;
          const filteredData = data.filter((nodeItem: FolderStructure) => {
            if (nodeItem.isFolder && nodeItem.id === node?.id) {
              return false;
            }
            return true;
          });
          setData(filteredData);
        }
        break;
      default:
        break;
    }
  };

  const getActionButtons = (node: FolderStructure, index: number) => (
    <div
      className="actionbtn-div"
      onClick={(event) => handleActionButtonsClick(event, node, index)}
    >
      <button data-action="add-file">Add File</button>
      <button data-action="add-folder">Add Folder</button>
      <button data-action="delete">Delete</button>
    </div>
  );

  return (
    <div className="container">
      {data.map((node: FolderStructure, index) => {
        return (
          <div key={node?.id}>
            <div style={{ display: "flex", gap: "4px" }}>
              {node?.isFolder && node?.children && !!node?.children.length && (
                <span
                  className="plus-icon"
                  onClick={() =>
                    setIsExpanded((prev: any) => ({
                      ...prev,
                      [node.id]: !prev[node.id],
                    }))
                  }
                >{`${isExpanded[node?.id] ? "-" : "+"}`}</span>
              )}
              <div style={{ display: "flex", gap: "4px" }}>
                <span
                  className={`${node?.isFolder ? "folderName" : "fileName"}`}
                >
                  {node?.name}{" "}
                </span>
                {node?.isFolder && (
                  <span>{getActionButtons(node, index)} </span>
                )}
              </div>
            </div>
            {isExpanded[node?.id] &&
              node?.children &&
              !!node.children.length && (
                <div className="children-divs">
                  <List data={node.children} setData={setData} />
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(List);
