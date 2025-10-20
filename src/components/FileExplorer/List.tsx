import { useState } from "react";
import { FolderStructure } from "../../typings/fileExplorer";

const List = ({ data }: any) => {
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
            <span>{node.name}</span>
            {isExpanded[node?.id] && node?.children && node.children.length && (
              <div className="children-divs">
                <List data={node.children} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default List;
