import { GameBoard, GameSquare, RoadTile } from '../interfaces/gameBoard';
import { roadTiles } from './roadTiles';

const randomRoadTile = () => {
    const randomIndex = Math.floor(Math.random() * roadTiles.length);
    return roadTiles[randomIndex];
};

export const gameBoard: GameBoard = {
    row5: [
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
    ],
    row4: [
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
    ],
    row3: [
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
    ],
    row2: [
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
    ],
    row1: [
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
        { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() },
    ],
};

const createGameBoardArray = () => {
    const gameBoardArray = [];

    for (let i = 0; gameBoardArray.length < 25; i++) {
        const gameTile: GameSquare = { isActive: false, isRevealed: false, timer: 1, tile: randomRoadTile() };
        gameBoardArray.push(gameTile);
    }
    return gameBoardArray;
};

console.log(createGameBoardArray());
