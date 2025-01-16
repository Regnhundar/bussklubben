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
