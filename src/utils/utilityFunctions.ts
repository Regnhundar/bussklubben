import { roadTiles } from '../data/roadTiles';
import { GameSquare } from '../interfaces/gameBoard';

export function fisherYatesShuffle<T>(array: T[]): T[] {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export const randomRoadTile = () => {
    const randomIndex = Math.floor(Math.random() * roadTiles.length);
    return roadTiles[randomIndex];
};

export const createGameBoardArray = () => {
    const gameBoardArray = [];

    for (let i = 0; gameBoardArray.length < 25; i++) {
        const gameTile: GameSquare = { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() };
        gameBoardArray.push(gameTile);
    }
    return gameBoardArray;
};
