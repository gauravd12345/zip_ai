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
                if (moveIndex !== index) return null;

                const row = Math.floor(index / gridSize);
                const col = index % gridSize;
                const nextMove = i < moves.length - 1 ? moves[i + 1][0] : null;

                const lineColor = "bg-orange-500"; 

                const renderVerticalLine = (position) => (
                  <div
                    className={`absolute ${position}-[-2px] h-8 w-2 ${lineColor} rounded-${
                      position === "top" ? "t" : "b"
                    }-full z-10 mx-auto left-0 right-0`}
                  />
                );

                const renderHorizontalLine = (position) => (
                  <div
                    className={`absolute ${position}-[-5px] top-1/2 -translate-y-1/2 h-2 w-10 ${lineColor} rounded-${
                      position === "left" ? "r" : "l"
                    }-full z-10`}
                  />
                );

                const renderSegment = () => {
                  let startLine = null;
                  let endLine = null;

                  switch (move) {
                    case "up":
                      if (row >= 0) startLine = renderVerticalLine("bottom");
                      if (nextMove === "right") endLine = renderHorizontalLine("right");
                      else if (nextMove === "left") endLine = renderHorizontalLine("left");
                      else endLine = renderVerticalLine("top");
                      break;

                    case "down":
                      if (row <= gridSize - 1) startLine = renderVerticalLine("top");
                      if (nextMove === "right") endLine = renderHorizontalLine("right");
                      else if (nextMove === "left") endLine = renderHorizontalLine("left");
                      else endLine = renderVerticalLine("bottom");
                      break;

                    case "left":
                      if (col >= 0) startLine = renderHorizontalLine("right");
                      if (nextMove === "up") endLine = renderVerticalLine("top");
                      else if (nextMove === "down") endLine = renderVerticalLine("bottom");
                      else endLine = renderHorizontalLine("left");
                      break;

                    case "right":
                      if (col <= gridSize - 1) startLine = renderHorizontalLine("left");
                      if (nextMove === "up") endLine = renderVerticalLine("top");
                      else if (nextMove === "down") endLine = renderVerticalLine("bottom");
                      else endLine = renderHorizontalLine("right");
                      break;

                    default:
                      break;
                  }

                  return (
                    <div key={i} className="absolute inset-0 pointer-events-none">
                      {startLine}
                      {endLine}
                    </div>
                  );
                };

                return renderSegment();
              })}

              {isSelected !== 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                  {isSelected === "↑" || isSelected === "↓" || isSelected === "←" || isSelected === "→" ? (
                    <div className="w-12 h-12 bg-green-500" />
                  ) : (
                    <div className="w-12 h-12 bg-red-500" />
                  )}
                </div>
              )}

              
              {isSelected !== 0 && (isSelected !== "↑" && isSelected !== "↓" && isSelected !== "←" && isSelected !== "→") && <div className="absolute rounded-full bg-white h-7 w-7 z-10 relative">{isSelected}</div>}
              
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
