export interface GameSquare {
    isActive: boolean;
    isRevealed: boolean;
    timer: number;
    tile: RoadTile;
}
export interface GameBoard {
    row5: GameSquare[];
    row4: GameSquare[];
    row3: GameSquare[];
    row2: GameSquare[];
    row1: GameSquare[];
}
export interface RoadTile {
    src: string;
    connections: [boolean, boolean, boolean, boolean];
}
