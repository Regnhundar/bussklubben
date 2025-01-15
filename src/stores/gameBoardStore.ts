import { create } from 'zustand';
import { GameSquare } from '../interfaces/gameBoard';

interface GameBoardStore {
    gameBoard: GameSquare[];
    setGameBoard: (newBoard: GameSquare[] | ((currentBoard: GameSquare[]) => GameSquare[])) => void;
    updateGameSquare: (index: number, updates: Partial<GameSquare>) => void;
    tilesToSwap: number[];
    swapGameSquares: (index1: number, index2: number) => void;
    setTilesToSwap: (index?: number) => void;
}

const useGameBoardStore = create<GameBoardStore>((set) => ({
    gameBoard: [],
    setGameBoard: (newBoard) =>
        set((state) => ({
            gameBoard: typeof newBoard === 'function' ? newBoard(state.gameBoard) : newBoard,
        })),
    updateGameSquare: (index, updates) =>
        set((state) => ({
            gameBoard: state.gameBoard.map((square, i) => (i === index ? { ...square, ...updates } : square)),
        })),
    tilesToSwap: [],
    setTilesToSwap: (index) =>
        set((state) => {
            if (index === undefined) {
                return { tilesToSwap: [] };
            } else {
                return { tilesToSwap: [...state.tilesToSwap, index] };
            }
        }),
    swapGameSquares: (index1, index2) =>
        set((state) => {
            const newBoard = [...state.gameBoard];
            [newBoard[index1], newBoard[index2]] = [newBoard[index2], newBoard[index1]];
            return { gameBoard: newBoard };
        }),
}));

export default useGameBoardStore;
