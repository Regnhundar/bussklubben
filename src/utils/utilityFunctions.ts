import { IS_REVEALED } from '../constants';
import { roadTiles } from '../data/roadTiles';
import { EndPointInfo, SquareData } from '../interfaces/gameBoard';
import { Connections, GameBoardIndices, PossibleStartingIndices } from '../types/type';
import useGameBoardStore from '../stores/gameBoardStore';

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
            isLinkedToStart: false,
            delay: Math.random() * 0.3,
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

export const endPoints = (index: PossibleStartingIndices): EndPointInfo => {
    const endPoint: EndPointInfo = { arrowDirection: 'down', successConnection: 0 };

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

export const determineDirection = (currentSquare: GameBoardIndices, arrivedFromIndex: Connections): Connections => {
    const gameBoardArray = useGameBoardStore.getState().gameBoardArray; // getState låter dig hämta state från Zustand utan att vara i en tsx/jsx fil.

    const direction = gameBoardArray[currentSquare].tile.connections.findIndex(
        (value, index) => value === true && index !== arrivedFromIndex
    );
    return direction as Connections;
};
export const squareToCheck = (currentSquare: GameBoardIndices, direction: Connections) => {
    const nextSquare =
        direction === 0
            ? currentSquare - 5 // Upp
            : direction === 1
            ? currentSquare + 1 // Höger
            : direction === 2
            ? currentSquare + 5 // Ned
            : currentSquare - 1; // Vänster
    return nextSquare as GameBoardIndices;
};

export const checkForOutOfBounds = (indexOfSquare: number, indexOfDirection: number) => {
    const noUp = [0, 1, 2, 3, 4];
    const noRight = [4, 9, 14, 19, 24];
    const noDown = [20, 21, 22, 23, 24];
    const noLeft = [0, 5, 10, 15, 20];
    if (noUp.includes(indexOfSquare) && indexOfDirection === 0) {
        return true;
    }
    if (noRight.includes(indexOfSquare) && indexOfDirection === 1) {
        return true;
    }
    if (noDown.includes(indexOfSquare) && indexOfDirection === 2) {
        return true;
    }
    if (noLeft.includes(indexOfSquare) && indexOfDirection === 3) {
        return true;
    }
    return false;
};
