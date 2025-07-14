
export function createNewTree(tree, index, move, gridSize){
  const treeCopy = [...tree];
  let newIndex = index;
  let arrow = null;

  if (move === "up") {
    newIndex = index - gridSize;
    if (treeCopy[newIndex] === 0) {
      arrow = "↑";
      treeCopy[newIndex] = arrow;
    }
  } else if (move === "down") {
    newIndex = index + gridSize;
    if (treeCopy[newIndex] === 0) {
      arrow = "↓";
      treeCopy[newIndex] = arrow;
    }
  } else if (move === "left") {
    newIndex = index - 1;
    if (treeCopy[newIndex] === 0) {
      arrow = "←";
      treeCopy[newIndex] = arrow;
    }
  } else if (move === "right") {
    newIndex = index + 1;
    if (treeCopy[newIndex] === 0) {
      arrow = "→";
      treeCopy[newIndex] = arrow;
    }
  }

  console.log(`Move ${move} from ${index} to ${newIndex}. Arrow: ${arrow || "(none)"}`);
  console.log("New Tree:", [...treeCopy]);

  return [treeCopy, newIndex];

}


export function validMoves(tree, index, gridSize){
  let moves = [];
  if(((index - gridSize) >= 0) && (typeof tree[index - gridSize] === "number")){
    moves.push("up");

  }
  if(((index + gridSize) < (gridSize * gridSize)) && (typeof tree[index + gridSize] === "number")){
    moves.push("down");
    
  }
  if(((index % gridSize) != 0)  && (typeof tree[index - 1] === "number")){
    moves.push("left");
    
  }
  if(((index % gridSize) != (gridSize - 1)) && (typeof tree[index + 1] === "number")){
    moves.push("right");

  } 

  return moves;
}





