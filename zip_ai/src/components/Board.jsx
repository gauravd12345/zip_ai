import { useState, useEffect } from "react";
import { validMoves, createTrees } from "./GeneratedTree";

const Board = ({ gridSize, selectedCells, setSelectedCells }) => {
  const [counter, setCounter] = useState(1);

  const drawCell = (index) => {
    setSelectedCells((prev) => {
      if (prev[index] !== 0) return prev;
      const updated = [...prev];
      updated[index] = counter;
      setCounter(counter + 1);
      return updated;
    });
  };

  useEffect(() => {
    const startIndex = selectedCells.indexOf(1);
    if (startIndex !== -1) {
      searchTree([startIndex], gridSize, 3, selectedCells);
    }
  }, [selectedCells, gridSize]); 

  function searchTree(startIndices, gridSize, iterations, tree) {
    if (iterations === 0) return;

    let newStartIndices = [];
    let newTree = [...tree];

    for (let i = 0; i < startIndices.length; i++) {
      const moves = validMoves(startIndices[i], gridSize);
      const [trees, indices] = createTrees(newTree, startIndices[i], moves, gridSize);
      newStartIndices.push(...indices);

      // EDIT THIS
      newTree = trees[0];
      
    }

    setSelectedCells(newTree);


    setTimeout(() => {
      searchTree(newStartIndices, gridSize, iterations - 1, newTree);
    }, 500); 
  }

  return (
    <div className="flex flex-wrap w-60 select-none">
      {[...Array(gridSize)].flatMap((_, rowIndex) =>
        [...Array(gridSize)].map((_, colIndex) => {
          const index = rowIndex * gridSize + colIndex;
          const isSelected = selectedCells[index];

          return (
            <div
              key={index}
              onClick={() => drawCell(index)}
              className="relative w-15 h-15 border border-white text-black text-xl font-bold cursor-pointer flex items-center justify-center"
            >
              {isSelected !== 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                  {isSelected === "." ? (
                    <div className="w-12 h-12 bg-green-500" />
                  ) : (
                    <div className="w-12 h-12 bg-red-500" />
                  )}
                </div>
              )}
              {isSelected !== 0 && <span className="z-10 relative">{isSelected}</span>}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;
