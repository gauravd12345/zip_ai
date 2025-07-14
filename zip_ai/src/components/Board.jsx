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

  // Finding the initial starting index
  let startIndex = -1;
  for(let i = 0; i < selectedCells.length; i++){
    if(selectedCells[i] == 1){
      startIndex = i;
    }
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function searchTree(startIndices, gridSize, iterations, tree) {
    console.log(startIndices, iterations);
    if (iterations == 0){
      setSelectedCells([...tree]);
      return;
    }
    const moves = validMoves(tree, startIndices[0], gridSize)
    const [newTrees, newIndicies] = createTrees(tree, startIndices[0], moves, gridSize);

    console.log(newTrees[0], newIndicies[0]);
    for(let i = 0; i < newIndicies.length; i++){
      searchTree([newIndicies[i]], gridSize, iterations - 1, newTrees[i]);
      await delay(5000);

    }
    

  }

  return (
    <div className="flex flex-wrap w-50 select-none">
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

      <button className="my-5 mx-auto " onClick={() => searchTree([startIndex], gridSize, 3, selectedCells)}>Start</button>
    </div>
  );
};

export default Board;
