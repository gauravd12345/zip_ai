import { useState} from "react";
import { validMoves, createNewTree } from "./GeneratedTree";

const Board = ({ gridSize, selectedCells, setSelectedCells }) => {
  const [counter, setCounter] = useState(1);
  const [found, setFound] = useState();
  const [moves, setMoves] = useState([]);

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
  async function searchTree(startIndices, gridSize, iterations, tree, paths, movesPassed) {
    const moves = validMoves(tree, startIndices[0], gridSize, paths);
    
    if(iterations === (gridSize * gridSize) - 1 || moves.length === 0){
      if(paths.length + 1 === counter && !tree.includes(0)){
        setSelectedCells([...tree]);
        setMoves(movesPassed);
        console.log(movesPassed);
        return true;
      }
      return false;
    }

    
    for(let i = 0; i < moves.length; i++){
      const [newTree, newIndex] = createNewTree(tree, startIndices[0], moves[i], gridSize);
      const newPaths = [...paths];
      const movesTaken = [...movesPassed, [moves[i], newIndex]];

      if(newTree[newIndex] === (newPaths[newPaths.length -1] + 1)){
        newPaths.push(newPaths[newPaths.length -1] + 1);

      }

      const found = await searchTree([newIndex], gridSize, iterations + 1, newTree, newPaths, movesTaken);
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

              {moves.map(([move, moveIndex], i) => {
                const nextMove = i < moves.length - 1 ? moves[i + 1][0] : null;

                if (moveIndex !== index) return null;

                const row = Math.floor(index / gridSize);
                const col = index % gridSize;

                if (move === "up" && row >= 0) {
                  return (
                    <div key={i} className="absolute inset-0 pointer-events-none">
                      <div className="absolute bottom-[-1px] h-8 w-2 bg-sky-400 rounded-full z-10 mx-auto left-0 right-0" />
                      {nextMove === "right" ? 
                        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 h-2 w-9.5 bg-sky-400 rounded-full z-10" />
                      : 
                      nextMove === "left" ? 
                        <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 h-2 w-9.5 bg-sky-400 rounded-full z-10" />
                      : 
                        <div className="absolute top-[-1px] h-8 w-2 bg-sky-400 rounded-full z-10 mx-auto left-0 right-0" />
                      }
                      
                    </div>
                  );
                }

                if (move === "down" && row <= gridSize - 1) {
                  return (
                    <div key={i} className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-[-1px] h-8 w-2 bg-orange-400 rounded-full z-10 mx-auto left-0 right-0" />
                      {nextMove === "right" ? 
                        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 h-2 w-9.5 bg-orange-400 rounded-full z-10" />
                      : 
                      nextMove === "left" ? 
                        <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 h-2 w-9.5 bg-orange-400 rounded-full z-10" />
                      : 
                        <div className="absolute bottom-[-1px] h-8 w-2 bg-orange-400 rounded-full z-10 mx-auto left-0 right-0" />
                      }

                    </div>
                  );
                }

                if (move === "left" && col >= 0) {
                  return (
                    <div key={i} className="absolute inset-0 pointer-events-none">

                      <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 h-2 w-9.5 bg-orange-400 rounded-full z-10" />
                      {nextMove === "up" ? 
                        <div className="absolute top-[-1px] h-8 w-2 bg-orange-400 rounded-full z-10 mx-auto left-0 right-0" />
                      : 
                      nextMove === "down" ? 
                        <div className="absolute bottom-[-1px] h-8 w-2 bg-orange-400 rounded-full z-10 mx-auto left-0 right-0" />
                      : 
                        <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 h-2 w-9.5 bg-orange-400 rounded-full z-10" />
                      }

                    </div>
                  );
                }

                if (move === "right" && col <= gridSize - 1) {
                  return (
                    <div key={i} className="absolute inset-0 pointer-events-none">

                      <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 h-2 w-9.5 bg-sky-400 rounded-full z-10" />
                      {nextMove === "up" ? 
                        <div className="absolute top-[-1px] h-8 w-2 bg-sky-400 rounded-full z-10 mx-auto left-0 right-0" />
                      : 
                      nextMove === "down" ? 
                        <div className="absolute bottom-[-1px] h-8 w-2 bg-sky-400 rounded-full z-10 mx-auto left-0 right-0" />
                      : 
                        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 h-2 w-9.5 bg-sky-400 rounded-full z-10" />
                      }

                    </div>
                  );
                }

                return null;
              })}

              <div className="absolute z-0 w-12 h-12 bg-white"/>

              
              {isSelected !== 0 ? (
                isSelected === "↑" || isSelected === "↓" || isSelected === "←" || isSelected === "→" ? (
                  <div className="absolute rounded-full text-black h-7 w-7 z-10 relative">{isSelected}</div>
                ) : (
                  <div className="absolute rounded-full bg-black text-white h-7 w-7 z-10 relative">{isSelected}</div>
                )
              ) : null}

              
            </div>
          );
        })
      )}

      <button className="my-5 mx-auto " onClick={() => {
        const result = searchTree([startIndex], gridSize, 0, selectedCells, [1], [])
        setFound(result);
        }}>Start</button>
        
    </div>
  );
};

export default Board;
