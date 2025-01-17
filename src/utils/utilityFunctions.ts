import { SQUARE_TIMER } from '../constants';
import { roadTiles } from '../data/roadTiles';
import { SquareData } from '../interfaces/gameBoard';
import { approvedIndices } from '../types/type';

export function fisherYatesShuffle<T>(array: T[]): T[] {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
export function returnRandomArrayItem<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export const createGameBoardArray = () => {
    const gameBoardArray = [];
    for (let i = 0; gameBoardArray.length < 25; i++) {
        const randomRoadTile = returnRandomArrayItem(roadTiles);
        const gameTile: SquareData = { isActive: false, isRevealed: false, timer: SQUARE_TIMER, tile: randomRoadTile };
        gameBoardArray.push(gameTile);
    }
    return gameBoardArray;
};

export const generateStartAndFinishIndex = (): { start: approvedIndices; finish: approvedIndices } => {
    const approvedIndices: approvedIndices[] = [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24];
    const shuffledIndices = fisherYatesShuffle(approvedIndices);

    return { start: shuffledIndices[0], finish: shuffledIndices[1] };
};

export const checkSquareConnections = (): boolean => {
    return true;
};
