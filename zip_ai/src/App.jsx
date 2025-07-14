import { useState } from 'react'
import './App.css'
import Board from './components/Board'


function App() {
  const gridSize = 4;
  const [selectedCells, setSelectedCells] = useState(Array(gridSize * gridSize).fill(0));


  return (
    <div>
      <Board gridSize={gridSize} selectedCells={selectedCells} setSelectedCells={setSelectedCells}/>
      
    </div>
    
  )
}

export default App
