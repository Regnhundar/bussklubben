import { RoadTile } from '../interfaces/gameBoard';

//* [upp, höger, ned, vänster]

export const upDown: RoadTile = {
    name: 'upDown',
    src: `${import.meta.env.BASE_URL}images/roadTiles/upDown.svg`,
    connections: [true, false, true, false],
};

export const upLeft: RoadTile = {
    name: 'upLeft',
    src: `${import.meta.env.BASE_URL}images/roadTiles/upLeft.svg`,
    connections: [true, false, false, true],
};

export const upRight: RoadTile = {
    name: 'upRight',
    src: `${import.meta.env.BASE_URL}images/roadTiles/upRight.svg`,
    connections: [true, true, false, false],
};
export const rightLeft: RoadTile = {
    name: 'rightLeft',
    src: `${import.meta.env.BASE_URL}images/roadTiles/rightLeft.svg`,
    connections: [false, true, false, true],
};

export const rightDown: RoadTile = {
    name: 'rightDown',
    src: `${import.meta.env.BASE_URL}images/roadTiles/rightDown.svg`,
    connections: [false, true, true, false],
};

export const downLeft: RoadTile = {
    name: 'downLeft',
    src: `${import.meta.env.BASE_URL}images/roadTiles/downLeft.svg`,
    connections: [false, false, true, true],
};

export const stop: RoadTile = {
    name: 'stop',
    src: `${import.meta.env.BASE_URL}images/roadTiles/stop.svg`,
    connections: [false, false, false, false],
};

export const roadTiles: RoadTile[] = [upDown, upLeft, upRight, rightLeft, rightDown, downLeft, stop];
export const jokerRoadTiles: RoadTile[] = [...roadTiles].filter((tile) => tile.name !== 'stop');
