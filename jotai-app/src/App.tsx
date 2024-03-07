import React from "react";
import { Provider, useAtom } from "jotai";
import { tableAtom, sourceCellAtom } from "./store/store";

const App: React.FC = () => {
  const [table, setTable] = useAtom(tableAtom);
  const [sourceCell, setSourceCell] = useAtom(sourceCellAtom);

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    setTable((prevTable) =>
      prevTable.map((row, r) => (r === rowIndex ? row.map((cell, c) => (c === colIndex ? value : cell)) : row))
    );
  };

  const handleReset = () => {
    setTable(Array.from({ length: 1000 }, () => Array(10).fill("")));
  };

  const handleDragStart = (rowIndex: number, colIndex: number) => {
    setSourceCell({ rowIndex, colIndex });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropEvent = (e: React.DragEvent, rowIndex: number, colIndex: number) => {
    e.preventDefault();
    if (sourceCell) {
      setTable((prevTable) => {
        const temp = prevTable[rowIndex][colIndex];
        prevTable[rowIndex][colIndex] = prevTable[sourceCell.rowIndex][sourceCell.colIndex];
        prevTable[sourceCell.rowIndex][sourceCell.colIndex] = temp;
        return prevTable;
      });
    }
    setSourceCell(null);
  };

  return (
    <Provider>
      <div>
        <br />
        <br />
        <button onClick={handleReset}>Reset Fields</button>
        <hr />
        <table>
          <tbody>
            {table.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    draggable
                    onDragStart={() => handleDragStart(rowIndex, colIndex)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropEvent(e, rowIndex, colIndex)}
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Provider>
  );
};

export default App;
