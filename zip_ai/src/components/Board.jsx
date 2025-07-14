import { useState} from "react";
import { validMoves, createNewTree } from "./GeneratedTree";

const Board = ({ gridSize, selectedCells, setSelectedCells }) => {
  const [counter, setCounter] = useState(1);
  const [found, setFound] = useState();

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

  // Delay function
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /*
    DFS Implementation 
   */
  async function searchTree(startIndices, gridSize, iterations, tree, paths) {
    const moves = validMoves(tree, startIndices[0], gridSize);

    if(iterations === (gridSize * gridSize) - 1 || moves.length === 0){
      if(paths.length + 1 === counter && !tree.includes(0)){
        setSelectedCells([...tree]);
        return true;
      }
      return false;
    }

    for(let i = 0; i < moves.length; i++){
      const [newTree, newIndex] = createNewTree(tree, startIndices[0], moves[i], gridSize);

      const newPaths = [...paths];
      if(newTree[newIndex] === (newPaths[newPaths.length -1] + 1)){
        newPaths.push(newPaths[newPaths.length -1] + 1);

      }

      const found = await searchTree([newIndex], gridSize, iterations + 1, newTree, newPaths);
      if (found) return true;

    }
    console.log("No solution");
    return false;
    
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
                  {isSelected === "↑" || isSelected === "↓" || isSelected === "←" || isSelected === "→" ? (
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

      <button className="my-5 mx-auto " onClick={() => {
        const result = searchTree([startIndex], gridSize, 0, selectedCells, [1])
        setFound(result);
        }}>Start</button>
        
    </div>
  );
};

export default Board;
