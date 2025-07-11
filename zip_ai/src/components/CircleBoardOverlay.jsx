import React from "react"

const CircleBoardOverlay = (direction) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
      <div className="w-12 h-12 bg-sky-300"></div>
      
      {direction == null ?

      <div className="w-12 h-8 bg-sky-300"></div> 

      : <div/>}

    </div>
  )
}

export default CircleBoardOverlay