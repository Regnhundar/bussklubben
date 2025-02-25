import { IS_REVEALED, SQUARE_TIMER } from '../constants';
import { RoadTile, SquareData } from '../interfaces/gameBoard';

//* [upp, höger, ned, vänster]

export const upDown: RoadTile = {
    name: 'upDown',
    src: `${import.meta.env.BASE_URL}images/roadTiles/upDown.svg`,
    alt: 'En vägbit med öppning upp och ned.',
    connections: [true, false, true, false],
};

export const upLeft: RoadTile = {
    name: 'upLeft',
    src: `${import.meta.env.BASE_URL}images/roadTiles/upLeft.svg`,
    alt: 'En vägbit med öppning upp och vänster.',
    connections: [true, false, false, true],
};

export const upRight: RoadTile = {
    name: 'upRight',
    src: `${import.meta.env.BASE_URL}images/roadTiles/upRight.svg`,
    alt: 'En vägbit med öppning upp och höger.',
    connections: [true, true, false, false],
};
export const rightLeft: RoadTile = {
    name: 'rightLeft',
    src: `${import.meta.env.BASE_URL}images/roadTiles/rightLeft.svg`,
    alt: 'En vägbit med öppning höger och vänster.',
    connections: [false, true, false, true],
};

export const rightDown: RoadTile = {
    name: 'rightDown',
    src: `${import.meta.env.BASE_URL}images/roadTiles/rightDown.svg`,
    alt: 'En vägbit med öppning höger och ned.',
    connections: [false, true, true, false],
};

export const downLeft: RoadTile = {
    name: 'downLeft',
    src: `${import.meta.env.BASE_URL}images/roadTiles/downLeft.svg`,
    alt: 'En vägbit med öppning ned och vänster.',
    connections: [false, false, true, true],
};

export const stop: RoadTile = {
    name: 'stop',
    src: `${import.meta.env.BASE_URL}images/roadTiles/stop.svg`,
    alt: 'En stoppskylt som saknar öppningar.',
    connections: [false, false, false, false],
};

// export const testGameBoard1: SquareData[] = [
//     {
//         isActive: false,

//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,

//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,

//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: downLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightDown,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: upLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: upRight,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: downLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightDown,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: upLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: upRight,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
//     {
//         isActive: false,
//         isRevealed: IS_REVEALED,
//         isLinkedToStart: true,
//         delay: SQUARE_TIMER,
//         tile: rightLeft,
//     },
// ];

export const roadTiles: RoadTile[] = [upDown, upLeft, upRight, rightLeft, rightDown, downLeft, stop];
export const jokerRoadTiles: RoadTile[] = [...roadTiles].filter((tile) => tile.name !== 'stop');
