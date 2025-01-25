import { create } from 'zustand';
import { SquareData } from '../interfaces/gameBoard';
import { Connections, GameBoardIndices, PossibleStartingIndices } from '../types/type';

interface GameBoardStore {
    gameBoardArray: SquareData[];
    setGameBoardArray: (newBoard: SquareData[] | ((currentBoard: SquareData[]) => SquareData[])) => void;
    startingIndex: PossibleStartingIndices | null;
    setStartingIndex: (index: PossibleStartingIndices | null) => void;
    nextSquareToCheckIndex: GameBoardIndices | null;
    setNextSquareToCheckIndex: (index: GameBoardIndices | null) => void;
    arrivalIndex: Connections | null;
    setArrivalIndex: (index: Connections | null) => void;
    endingIndex: PossibleStartingIndices | null;
    setEndingIndex: (index: PossibleStartingIndices | null) => void;
    startConnectionIndex: Connections | null;
    setStartConnectionIndex: (index: Connections | null) => void;
    finishConnectionIndex: Connections | null;
    setFinishConnectionIndex: (index: Connections | null) => void;
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
    startingIndex: null,
    setStartingIndex: (index) => set({ startingIndex: index }),
    nextSquareToCheckIndex: null,
    setNextSquareToCheckIndex: (index) => set({ nextSquareToCheckIndex: index }),
    endingIndex: null,
    setEndingIndex: (index) => set({ endingIndex: index }),
    startConnectionIndex: null,
    setStartConnectionIndex: (index) => set({ startConnectionIndex: index }),
    finishConnectionIndex: null,
    setFinishConnectionIndex: (index) => set({ finishConnectionIndex: index }),
    arrivalIndex: null,
    setArrivalIndex: (index) => set({ arrivalIndex: index }),
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
