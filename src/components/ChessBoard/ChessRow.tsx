const ChessRow = ({ data, row }: any) => {
  return (
    <div>
      {!!data.length &&
        data.map((item: string, index: number) => (
          <span
            className={`color-${item}`}
            onClick={() => {
              alert(`${row}*${index + 1} Color is ${item}`);
            }}
          >
            {item}
          </span>
        ))}
    </div>
  );
};

export default ChessRow;
