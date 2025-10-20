import { Dispatch, SetStateAction, useState } from "react";
import { FolderStructure } from "../../typings/fileExplorer";

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
    id: string
  ) => {
    const target = event.target as HTMLElement;
    const action = target.dataset.action;
    console.log(action, id);
    switch (action) {
      case "add-file":
        break;
      case "add-folder":
        break;
      case "delete":
        {
          const filteredData = data.filter((node: FolderStructure) => {
            if (node.isFolder && node.id === id) {
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

  const getActionButtons = (id: string) => (
    <div
      className="actionbtn-div"
      onClick={(event) => handleActionButtonsClick(event, id)}
    >
      <button data-action="add-file">Add File</button>
      <button data-action="add-folder">Add Folder</button>
      <button data-action="delete">Delete</button>
    </div>
  );

  return (
    <div className="container">
      {data.map((node: FolderStructure) => {
        return (
          <div key={node.id}>
            {node.isFolder && (
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
              <span>{node.name} </span>
              {node.isFolder && <span>{getActionButtons(node.id)} </span>}
            </div>
            {isExpanded[node?.id] && node?.children && node.children.length && (
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

export default List;
