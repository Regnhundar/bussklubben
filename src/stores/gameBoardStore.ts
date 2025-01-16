import { create } from 'zustand';
import { SquareData } from '../interfaces/gameBoard';

interface GameBoardStore {
    gameBoardArray: SquareData[];
    setGameBoardArray: (newBoard: SquareData[] | ((currentBoard: SquareData[]) => SquareData[])) => void;
    updateGameSquare: (index: number, updates: Partial<SquareData>) => void;
    squaresToSwap: number[];
    setSquaresToSwap: (index?: number) => void;
    swapGameSquares: (index1: number, index2: number) => void;
}

const useGameBoardStore = create<GameBoardStore>((set) => ({
    gameBoardArray: [],
    setGameBoardArray: (newBoard) =>
        set((state) => ({
            gameBoardArray: typeof newBoard === 'function' ? newBoard(state.gameBoardArray) : newBoard,
        })),
    updateGameSquare: (index, updates) =>
        set((state) => ({
            gameBoardArray: state.gameBoardArray.map((square, i) => (i === index ? { ...square, ...updates } : square)),
        })),
    squaresToSwap: [],
    setSquaresToSwap: (index) =>
        set((state) => {
            if (index === undefined) {
                return { squaresToSwap: [] };
            } else {
                return { squaresToSwap: [...state.squaresToSwap, index] };
            }
        }),
    swapGameSquares: (index1, index2) =>
        set((state) => {
            const newGameBoardArray = [...state.gameBoardArray];
            [newGameBoardArray[index1], newGameBoardArray[index2]] = [
                newGameBoardArray[index2],
                newGameBoardArray[index1],
            ];
            return { gameBoardArray: newGameBoardArray };
        }),
}));

export default useGameBoardStore;
