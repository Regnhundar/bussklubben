import { create } from 'zustand';

interface GameStore {
    totalTime: number;
    setTotalTime: (value: number | ((prev: number) => number)) => void;
    isPreparationTime: boolean;
    setPreparationTime: (value: boolean | ((prev: boolean) => boolean)) => void;
    preparationTime: number;
    points: number;
    setPoints: (value: number | ((prev: number) => number)) => void;
    isGameRunning: boolean;
    setIsGameRunning: (value: boolean | ((prev: boolean) => boolean)) => void;
    isGameOver: boolean;
    setIsGameOver: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const useGameStore = create<GameStore>((set) => ({
    totalTime: 30,
    setTotalTime: (value) =>
        set((state) => ({
            totalTime: typeof value === 'function' ? value(state.totalTime) : value,
        })),
    preparationTime: 10,
    isPreparationTime: false,
    setPreparationTime: (value) =>
        set((state) => ({
            isPreparationTime: typeof value === 'function' ? value(state.isPreparationTime) : value,
        })),
    points: 0,
    setPoints: (value) =>
        set((state) => ({
            points: typeof value === 'function' ? value(state.points) : value,
        })),
    isGameRunning: false,
    setIsGameRunning: (value) =>
        set((state) => ({
            isGameRunning: typeof value === 'function' ? value(state.isGameRunning) : value,
        })),
    isGameOver: false,
    setIsGameOver: (value) =>
        set((state) => ({
            isGameOver: typeof value === 'function' ? value(state.isGameOver) : value,
        })),
}));

export default useGameStore;
