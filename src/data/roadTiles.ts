import { RoadTile } from '../interfaces/gameBoard';

export const upDown: RoadTile = {
    src: './images/roadTiles/upDown.svg',
    connections: [true, false, true, false],
};

export const upLeft: RoadTile = {
    src: './images/roadTiles/upLeft.svg',
    connections: [true, false, false, true],
};

export const upRight: RoadTile = {
    src: './images/roadTiles/upRight.svg',
    connections: [true, true, false, false],
};
export const rightLeft: RoadTile = {
    src: './images/roadTiles/rightLeft.svg',
    connections: [false, true, false, true],
};

export const rightDown: RoadTile = {
    src: './images/roadTiles/rightDown.svg',
    connections: [false, true, true, false],
};

export const downLeft: RoadTile = {
    src: './images/roadTiles/downLeft.svg',
    connections: [false, false, true, true],
};

export const stop: RoadTile = {
    src: './images/roadTiles/stop.svg',
    connections: [false, false, false, false],
};

export const roadTiles: RoadTile[] = [upDown, upLeft, upRight, rightLeft, rightDown, downLeft, stop];
