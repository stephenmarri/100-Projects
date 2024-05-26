import React from 'react'

const Tile = ({id, value}) => {
  return (
    <div id={id} className="board-tile bg-gray-300">{value}</div>
  )
}

export default Tile