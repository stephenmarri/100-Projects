import { useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board'



function App() {
  const FILLER = ""
  const [turn, setTurn] = useState("X");
  const [tile_values, setTile_values] = useState(Array(9).fill(FILLER));

  const checkSquaresFilled = () => {
    if (tile_values.filter(x => x != FILLER).length >= 9) {
      setTurn("X")
      alert(`Game Over.!!!`)
      setTile_values(Array(9).fill(FILLER))
    }
  }

  const checkWinner = () => {
    //check winner
    if (tile_values.filter(x => x != FILLER).length >= 5) {
      console.log("5 moves reached. Checking for winner")
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (tile_values[a] != FILLER && tile_values[a] == tile_values[b] && tile_values[a] == tile_values[c]) {
          setTurn("X")
          alert(`Game Over. Winner is ${tile_values[a]}!!!`)
          setTile_values(Array(9).fill(FILLER))
        }
      }
    }
  }

  useEffect(() => {
    if (tile_values.filter(x => x != FILLER).length >= 9) {
      requestAnimationFrame(() => {
        // Ensure it runs after the entire DOM is loaded
        setTimeout(() => {
          setTurn("X")
          alert(`Game Over.!!!`)
          setTile_values(Array(9).fill(FILLER))
        }, 0);
      });
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        checkSquaresFilled()
        checkWinner()
      }, 0);
    })

  }, [turn])

  console.log(`starting child components rendering move: ${tile_values.filter(x => x != FILLER).length}`)

  return <>
    <div id='main_container' className="container w-11/12 md:w-1/2 lg:w-1/4 mx-auto flex flex-col items-center justify-center h-full  bg-gray-100 text-center py-6">
      <h1 className='font-bold  text-3xl text-indigo-900 pb-3'>TIC TAC TOE</h1>
      <Board arr_values={tile_values} turn={turn} setTile_values={setTile_values} setTurn={setTurn} />
    </div>
  </>
}

export default App