export interface GameSquare {
    isActive: boolean;
    isRevealed: boolean;
    timer: number;
    connections: boolean[];
}
export interface GameBoard {
    row5: GameSquare[];
    row4: GameSquare[];
    row3: GameSquare[];
    row2: GameSquare[];
    row1: GameSquare[];
}
