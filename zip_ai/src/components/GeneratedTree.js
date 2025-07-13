

export function createTrees(tree, index, moves, gridSize){
  let newTrees = [];
  let newIndicies = [];
  for(let i = 0; i < moves.length; i++){
    const treeCopy = [...tree];
    const [newTree, newIndex] = createNewTree(treeCopy, index, moves[i], gridSize);
    newTrees.push(newTree);
    newIndicies.push(newIndex);

  }
  
  return [newTrees, newIndicies];
  
}

function createNewTree(tree, index, move, gridSize){
  let newIndex = 0;
  if(move == "up"){
    tree[index - gridSize] = ".";
    newIndex = index - gridSize;

  }
  else if(move == "down"){
    tree[index + gridSize] = ".";
    newIndex = index + gridSize;
    
  }
  else if(move == "left"){
    tree[index - 1] = ".";
    newIndex = index - 1;
    
  }
  else if(move == "right"){
    tree[index + 1] = ".";
    newIndex = index + 1;

  } 
  return [tree, newIndex];

}


export function validMoves(index, gridSize){
  let moves = [];
  if((index - gridSize) >= 0){
    moves.push("up");

  }
  if((index + gridSize) < (gridSize * gridSize)){
    moves.push("down");
    
  }
  if((index % gridSize) != 0){
    moves.push("left");
    
  }
  if((index % gridSize) != (gridSize - 1)){
    moves.push("right");

  } 

  return moves;
}





