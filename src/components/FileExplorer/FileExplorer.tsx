import { useState } from "react";
import fileExplorerJSON from "../../mockData/fileExplorer.json";
import "./styles.css";
import List from "./List";
const FileExplorer = () => {
  const [data, setData] = useState(fileExplorerJSON);
  return (
    <div>
      FileExplorer
      <List data={data} />
    </div>
  );
};

export default FileExplorer;
