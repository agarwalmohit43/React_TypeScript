import { FolderStructure } from "../../typings/fileExplorer2";
import { DataActions } from "../../constants/fileExplorer2";
import React from "react";

interface ListProps {
  data: FolderStructure[];
  handleDataUpdate: (node: FolderStructure, action?: DataActions) => void;
}

const List = ({ data, handleDataUpdate }: Readonly<ListProps>) => {
  const handleActionButtonsClick = (
    event: React.MouseEvent<HTMLDivElement | HTMLSpanElement>,
    node: FolderStructure
  ) => {
    const target = event.target as HTMLElement;
    const action = target.dataset?.action as DataActions | undefined;
    handleDataUpdate(node, action);
  };

  const getActionButtons = (node: FolderStructure, isFolder = true) => (
    <div
      className="actionbtn-div"
      onClick={(event) => handleActionButtonsClick(event, node)}
    >
      {isFolder && <button data-action={DataActions.ADD_FILE}>Add File</button>}
      {isFolder && (
        <button data-action={DataActions.ADD_FOLDER}>Add Folder</button>
      )}
      <button data-action={DataActions.DELETE_FOLDER}>Delete</button>
    </div>
  );

  return (
    <div className="container">
      {data.map((node: FolderStructure, index) => {
        const { id, isFolder, isExpanded, name, children = [] } = node;
        return (
          <div key={node?.id}>
            <div style={{ display: "flex", gap: "4px" }}>
              {node?.isFolder && node?.children && !!node?.children.length && (
                <span
                  className="plus-icon"
                  data-action={DataActions.TOGGLE_EXPAND}
                  onClick={(event) => handleActionButtonsClick(event, node)}
                >{`${isExpanded ? "-" : "+"}`}</span>
              )}
              <div style={{ display: "flex", gap: "4px" }}>
                <span
                  className={`${node?.isFolder ? "folderName" : "fileName"}`}
                >
                  {node?.name}{" "}
                </span>
                <span>{getActionButtons(node, node?.isFolder)} </span>
              </div>
            </div>
            {isExpanded && node?.children && !!node.children.length && (
              <div className="children-divs">
                <List
                  data={node.children}
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

export default React.memo(List);
