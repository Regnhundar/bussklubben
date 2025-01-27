import { create } from 'zustand';
import { PREPARATION_TIME, TOTAL_TIME } from '../constants';

interface GameStore {
    totalTime: number;
    setTotalTime: (value: number | ((prev: number) => number)) => void;
    isPreparationTime: boolean;
    setIsPreparationTime: (value: boolean | ((prev: boolean) => boolean)) => void;
    preparationTime: number;
    setPreparationTime: (value: number | ((prev: number) => number)) => void;
    points: number;
    setPoints: (value: number | ((prev: number) => number)) => void;
    level: number;
    setLevel: (value: number | ((prev: number) => number)) => void;
    isGameRunning: boolean;
    setIsGameRunning: (value: boolean | ((prev: boolean) => boolean)) => void;
    isGameOver: boolean;
    setIsGameOver: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const useGameStore = create<GameStore>((set) => ({
    totalTime: TOTAL_TIME,
    setTotalTime: (value) =>
        set((state) => ({
            totalTime: typeof value === 'function' ? value(state.totalTime) : value,
        })),
    preparationTime: PREPARATION_TIME,
    setPreparationTime: (value) =>
        set((state) => ({
            preparationTime: typeof value === 'function' ? value(state.preparationTime) : value,
        })),
    isPreparationTime: true,
    setIsPreparationTime: (value) =>
        set((state) => ({
            isPreparationTime: typeof value === 'function' ? value(state.isPreparationTime) : value,
        })),
    points: 0,
    setPoints: (value) =>
        set((state) => ({
            points: typeof value === 'function' ? value(state.points) : value,
        })),
    level: 1,
    setLevel: (value) =>
        set((state) => ({
            level: typeof value === 'function' ? value(state.level) : value,
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
