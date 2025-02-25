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
    startConnectionIndex: Connections | null;
    setStartConnectionIndex: (index: Connections | null) => void;
    updateGameSquare: (index: number, updates: Partial<SquareData>) => void;
    squareSpeed: 'normal' | 'turbo' | 'slow';
    setSquareSpeed: (speed: SquareSpeed) => void;
    squaresToSwap: number[];
    setSquaresToSwap: (index?: number) => void;
    swapGameSquares: (index1: number, index2: number) => void;
    activeJokerTile: number;
    setActiveJokerTile: (value: number | ((prev: number) => number)) => void;
    jokerTile: RoadTile | null;
    setJokerTile: (roadTile: RoadTile | null) => void;
    isExiting: boolean;
    setIsExiting: (value: boolean | ((prev: boolean) => boolean)) => void;
    triggerPath: number;
    setTriggerPath: (value: number | ((prev: number) => number)) => void;
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
    updateGameSquare: (index: number, updates: Partial<SquareData>) =>
        set((state) => {
            const newGameBoardArray = [...state.gameBoardArray];
            const square = newGameBoardArray[index];
            if (square) {
                Object.assign(square, updates);
            }
            return { gameBoardArray: newGameBoardArray };
        }),
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

    isExiting: false,
    setIsExiting: (value) =>
        set((state) => ({
            isExiting: typeof value === 'function' ? value(state.isExiting) : value,
        })),
    triggerPath: 0,
    setTriggerPath: (value) =>
        set((state) => ({
            triggerPath: typeof value === 'function' ? value(state.triggerPath) : value,
        })),
}));

export default useGameBoardStore;
