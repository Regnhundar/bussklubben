import { create } from 'zustand';
import { GameSquare } from '../interfaces/gameBoard';

interface GameBoardStore {
    gameBoard: GameSquare[];
    setGameBoard: (newBoard: GameSquare[] | ((currentBoard: GameSquare[]) => GameSquare[])) => void;
    updateGameSquare: (index: number, updates: Partial<GameSquare>) => void;
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
}));

export default useGameBoardStore;
