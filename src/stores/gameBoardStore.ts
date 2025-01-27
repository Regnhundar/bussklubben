import { create } from 'zustand';
import { RoadTile, SquareData } from '../interfaces/gameBoard';
import { Connections, GameBoardIndices, PossibleStartingIndices, SquareSpeed } from '../types/type';

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
    finishConnectionIndex: Connections | null;
    setFinishConnectionIndex: (index: Connections | null) => void;
    updateGameSquare: (index: number, updates: Partial<SquareData>) => void;
    squareSpeed: string;
    setSquareSpeed: (speed: SquareSpeed) => void;
    squaresToSwap: number[];
    setSquaresToSwap: (index?: number) => void;
    swapGameSquares: (index1: number, index2: number) => void;
    activeJokerTile: number;
    setActiveJokerTile: (value: number | ((prev: number) => number)) => void;
    jokerTile: RoadTile | null;
    setJokerTile: (roadTile: RoadTile | null) => void;
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
    finishConnectionIndex: null,
    setFinishConnectionIndex: (index) => set({ finishConnectionIndex: index }),
    arrivalIndex: null,
    setArrivalIndex: (index) => set({ arrivalIndex: index }),
    updateGameSquare: (index, updates) =>
        set((state) => ({
            gameBoardArray: state.gameBoardArray.map((square, i) => (i === index ? { ...square, ...updates } : square)),
        })),
    squareSpeed: 'normal',
    setSquareSpeed: (speed) => set({ squareSpeed: speed }),
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
    activeJokerTile: 0,
    setActiveJokerTile: (value) =>
        set((state) => ({
            activeJokerTile: typeof value === 'function' ? value(state.activeJokerTile) : value,
        })),
    jokerTile: null,
    setJokerTile: (roadTile) => set({ jokerTile: roadTile }),
}));

export default useGameBoardStore;
