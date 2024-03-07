import React from "react";
import useAppState from "./store/store";

const App: React.FC = () => {
  const { data, updateField, resetFields, setDragStart, clearDragStart, handleDrop } = useAppState();

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    updateField(rowIndex, colIndex, value);
  };

  const handleReset = () => {
    
    resetFields();

  };

  const handleDragStart = (e: React.DragEvent, rowIndex: number, colIndex: number) => {
    e.dataTransfer.effectAllowed = "move";
    setDragStart(rowIndex, colIndex);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropEvent = (e: React.DragEvent, rowIndex: number, colIndex: number) => {
    e.preventDefault();
    handleDrop(rowIndex, colIndex);
    clearDragStart();
  };

  return (
    <div>
      <br />
      <br />
      <button onClick={handleReset}>Reset Fields</button>
      <hr />
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropEvent(e, rowIndex, colIndex)}
                >
                  <input type="text" value={cell} onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
