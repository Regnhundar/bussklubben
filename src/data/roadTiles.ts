import { RoadTile } from '../interfaces/gameBoard';

//* [upp, höger, ned, vänster]

export const upDown: RoadTile = {
    name: 'upDown',
    src: './images/roadTiles/upDown.svg',
    connections: [true, false, true, false],
};

export const upLeft: RoadTile = {
    name: 'upLeft',
    src: './images/roadTiles/upLeft.svg',
    connections: [true, false, false, true],
};

export const upRight: RoadTile = {
    name: 'upRight',
    src: './images/roadTiles/upRight.svg',
    connections: [true, true, false, false],
};
export const rightLeft: RoadTile = {
    name: 'rightLeft',
    src: './images/roadTiles/rightLeft.svg',
    connections: [false, true, false, true],
};

export const rightDown: RoadTile = {
    name: 'rightDown',
    src: './images/roadTiles/rightDown.svg',
    connections: [false, true, true, false],
};

export const downLeft: RoadTile = {
    name: 'downLeft',
    src: './images/roadTiles/downLeft.svg',
    connections: [false, false, true, true],
};

export const stop: RoadTile = {
    name: 'stop',
    src: './images/roadTiles/stop.svg',
    connections: [false, false, false, false],
};

export const roadTiles: RoadTile[] = [upDown, upLeft, upRight, rightLeft, rightDown, downLeft, stop];
