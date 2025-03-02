import { Connections } from '../types/type';

export interface SquareData {
    isActive: boolean;
    isRevealed: boolean;
    isLinkedToStart: boolean;
    delay: number;
    tile: RoadTile;
}
export interface RoadTile {
    name: string;
    src: string;
    alt: string;
    connections: [boolean, boolean, boolean, boolean];
}
export interface EndPointInfo {
    arrowDirection: 'up' | 'down' | 'left' | 'right';
    successConnection: Connections;
}
