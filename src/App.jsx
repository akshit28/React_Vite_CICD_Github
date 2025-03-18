import { useState, useEffect } from 'react'
import './App.css'


const useTicTacToe = (size) => {
  const [board, setBoard] = useState(Array(size*size).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null)

  useEffect(()=> {
    setBoard(Array(size*size).fill(null))
    resetGame()
  }, [size])

  const checkWinner = (newBoard) => {
    const lines = []

    //row
    for (let i= 0;i<size;i++){
      lines.push(newBoard.slice(i*size, (i+1) * size))
    }

    // console.log("row push", lines)
    //column
    for(let i=0;i<size;i++){
      lines.push(newBoard.filter((_, index) => index % size === i))
    }

    // Diagonal Top-Left to Bottom-Right
    const topLeftBottomRight = [];
    for (let i = 0; i < size; i++) {
      topLeftBottomRight.push(newBoard[i * (size + 1)]);
    }
    lines.push(topLeftBottomRight);
    
    // Diagonal Top-Right to Bottom-Left
    const topRightBottomLeft = [];
    for (let i = 1; i <= size; i++) {
      topRightBottomLeft.push(newBoard[i * (size - 1)]);
    }
    lines.push(topRightBottomLeft);

    console.log("lines-----", lines)
    for(let line of lines){
      if(line.every(cell => cell === "X")) return "X"
      if(line.every(cell => cell === "O")) return "O"
    }

    return null
  }

  const handleClick = (index) => {

    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if(gameWinner){
      setWinner(gameWinner)
    }else{
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const resetGame = () => {
    setBoard(Array(size*size).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
  }

  return {board, handleClick, winner, resetGame}
}

function App() {
  const [size , setSize] = useState(3)
  const {board, handleClick, winner, resetGame} = useTicTacToe(size)

  return (
   <div>
    <div>Tic Tac Toe - {size}X{size}</div>
    <select onChange={(e) => setSize(Number(e.target.value))} value={size}>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>

    <div style={{display: "grid", gridTemplateColumns: `repeat(${size}, auto)`, gap:"0", marginTop: "10px", width: "400px"}}>
    {
      board.map((cell, index) => (
        <button key={index} onClick={()=> handleClick(index)} style={{height: "50px", border: "black solid 1px"}}>
          {cell}
        </button>
      ))
    }
    </div>
    {winner && <h3>Winner: {winner}</h3>}
    <button onClick={resetGame}>Reset</button>
   </div>
  )
}

export default App
