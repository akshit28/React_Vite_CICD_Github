import { useState, useEffect } from 'react'


const useTicTacToe = (config) => {
    
    const [isXNext, setIsXNext] = useState(true)
    const initialBoard = Array(config).fill(null)
    const [board, setBoard] = useState(Array(config).fill(null));
    useEffect(() => {
        setBoard(Array(config * config).fill(null)); // Reset board when config changes
    }, [config]);

    let blockClick = (index) => {
        const newBoard = [...board]
        newBoard[index] = isXNext ? "X" : "O"
        setBoard(newBoard)
        setIsXNext(!isXNext)
    }

    let resetBoard = () => {
        setBoard(initialBoard)
    }

    return {board, blockClick, resetBoard}
}

export default useTicTacToe