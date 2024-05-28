import React from 'react'


const Board = ({arr_values, turn, setTile_values, setTurn}) => {

    const turnStyle = "underline"
    const updateTile = (index) => {

        let newArr = [...arr_values]
        newArr[index] = turn
        setTile_values(newArr)
        setTurn(turn == "X" ? "O" : "X" )
    }


  return (
    <>
        <div id='board' className='grid p-3 uppercase'>
            {
            arr_values.map((value, index) => 
                <div key={index} id={index} onClick={()=>updateTile(index)} className=" text-blue-900 board-tile bg-gray-300">{value}</div>
            )
            }
        </div>
        <div id='turns' className='flex flex-row items-center w-1/2 text-indigo-900 text-5xl mt-3 font-sans justify-around font-bold'>
            <div id="turn_x" onClick={(index)=>updateTile(index)} className={turn == "X" ? turnStyle : ""}>
                X
            </div>
            <div id="turn_o" className={turn == "O" ? turnStyle : ""}>
                O
            </div>
        </div>
    </>
  )
}

export default Board