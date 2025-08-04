# Zip Puzzle Solver
An algorithm that can solve the popular LinkedIn mobile game Zip in real-time. The goal of this game is to find a distinct path in a grid such that the path goes through all numbered squares in a consecutive order while also filling each non-numbered square. To play the game for yourself, check out https://www.linkedin.com/games/zip/. 

## Examples:

<img width="293" height="347" alt="Screenshot 2025-07-15 at 8 42 33 AM" src="https://github.com/user-attachments/assets/6db63d04-0bf7-4383-b7c6-51fc520e585a" />
<img width="289" height="347" alt="Screenshot 2025-07-15 at 8 43 19 AM" src="https://github.com/user-attachments/assets/4b5a603d-5597-4c04-b263-5a749c96b514" />

## How it works 
This implementation uses DFS(Depth-First-Search) to find the optimal path. By modeling the grid as a unique "game state", a tree can be constructed from many such states. Starting from the beginning state, new states can be created by taking different paths or moves. To elaborate, if there are 3 possible moves(assume up, left, or right) for a given path, then 3 unique "game states" can be added to the tree from this 1 state. 

To search the tree for a solution, DFS was chosen over BFS(Breadth-First-Search) since the goal is to look for grids that have been completely filled; this would only occur at the last depth of the tree. Once such states have been reached, it is only a matter of applying certain conditional logic to check if a given grid state is valid. Using this, a valid solution can be found. Unlike BFS, DFS searches the tree by completely exhasuting one branch at a time. 

## Frameworks
    ReactJS
    NodeJS
    TailwindCSS & Vite

## Programming Languages
    Frontend: HTML, CSS, & JS
