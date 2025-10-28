import { useEffect, useState } from "react";
import "./styles.css";
import ChessRow from "./ChessRow";

const ChessBoard = () => {
  const size = 8;
  const [data, setData] = useState<any>(null);

  const generateData = () => {
    const newBoard: string[][] = [];

    for (let row = 0; row < size; row++) {
      const rowColors: string[] = [];
      for (let col = 0; col < size; col++) {
        const color = (row + col) % 2 === 0 ? "white" : "black";
        rowColors.push(color);
      }
      newBoard.push(rowColors);
    }

    setData(newBoard);
  };

  useEffect(() => {
    generateData();
  }, []);

  console.log(data);

  return (
    <div>
      ChessBoard
      <div className="container">
        {data &&
          !!data.length &&
          data.map((item: any, index: number) => (
            <ChessRow
              key={Math.random().toString(36).slice(2)}
              data={item}
              row={index + 1}
            />
          ))}
      </div>
    </div>
  );
};

export default ChessBoard;
