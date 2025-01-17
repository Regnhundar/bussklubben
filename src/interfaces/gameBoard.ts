export interface SquareData {
    isActive: boolean;
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
    successConnection: 0 | 1 | 2 | 3;
}
