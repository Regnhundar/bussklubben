import { IS_REVEALED, SQUARE_TIMER } from '../constants';
import { roadTiles } from '../data/roadTiles';
import { endPointInfo, SquareData } from '../interfaces/gameBoard';
import { PossibleStartingIndices } from '../types/type';

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
    const gameBoardArray: SquareData[] = [];
    for (let i = 0; gameBoardArray.length < 25; i++) {
        const randomRoadTile = returnRandomArrayItem(roadTiles);
        const gameTile: SquareData = {
            isActive: false,
            isRevealed: IS_REVEALED,
            timer: SQUARE_TIMER,
            tile: randomRoadTile,
        };
        gameBoardArray.push(gameTile);
    }
    return gameBoardArray;
};

export const generateStartAndFinishIndex = (): { start: PossibleStartingIndices; finish: PossibleStartingIndices } => {
    const PossibleStartingIndices: PossibleStartingIndices[] = [
        0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24,
    ];
    const shuffledIndices = fisherYatesShuffle(PossibleStartingIndices);

    return { start: shuffledIndices[0], finish: shuffledIndices[1] };
};

export const endPoints = (index: PossibleStartingIndices): endPointInfo => {
    const endPoint: endPointInfo = { arrowDirection: 'down', successConnection: 0 };

    if (index === 0) {
        const topLeft = returnRandomArrayItem([3, 0]);
        topLeft === 0
            ? ((endPoint.arrowDirection = 'up'), (endPoint.successConnection = 0))
            : ((endPoint.arrowDirection = 'left'), (endPoint.successConnection = 3));
    }
    if ([1, 2, 3].includes(index)) {
        endPoint.arrowDirection = 'up';
        endPoint.successConnection = 0;
    }
    if (index === 4) {
        const topRight = returnRandomArrayItem([1, 0]);
        topRight === 0
            ? ((endPoint.arrowDirection = 'up'), (endPoint.successConnection = 0))
            : ((endPoint.arrowDirection = 'right'), (endPoint.successConnection = 1));
    }
    if ([5, 10, 15].includes(index)) {
        endPoint.arrowDirection = 'left';
        endPoint.successConnection = 3;
    }
    if ([9, 14, 19].includes(index)) {
        endPoint.arrowDirection = 'right';
        endPoint.successConnection = 1;
    }
    if (index === 20) {
        const bottomLeft = returnRandomArrayItem([3, 2]);
        bottomLeft === 3
            ? ((endPoint.arrowDirection = 'left'), (endPoint.successConnection = 3))
            : ((endPoint.arrowDirection = 'down'), (endPoint.successConnection = 2));
    }
    if ([21, 22, 23].includes(index)) {
        endPoint.arrowDirection = 'down';
        endPoint.successConnection = 2;
    }
    if (index === 24) {
        const bottomRight = returnRandomArrayItem([1, 2]);
        bottomRight === 1
            ? ((endPoint.arrowDirection = 'right'), (endPoint.successConnection = 1))
            : ((endPoint.arrowDirection = 'down'), (endPoint.successConnection = 2));
    }

    return endPoint;
};

// export const checkSquareConnections = (index: GameBoardIndices, gameBoardArray: SquareData[]): boolean => {
//     gameBoardArray[index].tile.connections;
//     return true;
// };
// export const checkStartingSquare = (index: PossibleStartingIndices, gameBoardArray: SquareData[]): boolean => {
//     return true;
// };
