import { useState } from "react";
import CircleBoardOverlay from "./CircleBoardOverlay";

const Board = () => {
  const [selectedCells, setSelectedCells] = useState(Array(16).fill(0));
  const [counter, setCounter] = useState(1);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [direction, setDirection] = useState({});
  const [prevSelected, setPrevSelected] = useState(null);

  const drawCell = (index, dir) => {
    setSelectedCells((prev) => {
      if (prev[index] !== 0) return prev;
      const updated = [...prev];
      updated[index] = counter;
      setCounter(counter + 1);
      return updated;
    });
    setPrevSelected(index);
    setDirection((prevDir) => ({ ...prevDir, [index]: dir }));
  };

  const handleMouseDown = (index) => {
    setIsMouseDown(true);
    drawCell(index, null);
  };

  const handleMouseEnter = (index) => {
    if (!isMouseDown || selectedCells[index] !== 0) return;

    const prev = prevSelected;
    const delta = index - prev;
    let dir = "";

    if (delta === 1) dir = "right";
    else if (delta === -1) dir = "left";
    else if (delta === 4) dir = "down";
    else if (delta === -4) dir = "up";

    drawCell(index, dir);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      className="flex flex-wrap w-60 select-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {[...Array(4)].flatMap((_, rowIndex) =>
        [...Array(4)].map((_, colIndex) => {
          const index = rowIndex * 4 + colIndex;
          const isSelected = selectedCells[index];

          return (
            <div
              key={index}
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              className="relative w-15 h-15 border border-white text-black text-xl font-bold cursor-pointer flex items-center justify-center"
            >
              
              {isSelected !== 0 && <CircleBoardOverlay dir={direction[index]} />}

              {isSelected !== 0 && (
                <span className="z-10 relative">{isSelected}</span>
              )}
            </div>
          );
        })
      )}

      <button className="mt-4 ml-2 px-4 py-2 bg-black text-white rounded">
        Start
      </button>
    </div>
  );
};

export default Board;
