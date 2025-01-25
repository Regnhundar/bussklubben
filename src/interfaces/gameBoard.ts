import { Connections } from '../types/type';

export interface SquareData {
    isActive: boolean;
    isPreviousSquare: boolean;
    isRevealed: boolean;
    timer: number;
    tile: RoadTile;
}
export interface RoadTile {
    src: string;
    connections: [boolean, boolean, boolean, boolean];
}
export interface endPointInfo {
    arrowDirection: 'up' | 'down' | 'left' | 'right';
    successConnection: Connections;
}
