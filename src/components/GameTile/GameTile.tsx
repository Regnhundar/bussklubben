import './GameTile.css';
import { GameSquare } from '../../interfaces/gameBoard';
import useGameBoardStore from '../../stores/gameBoardStore';
import { useEffect, useState } from 'react';

interface Props {
    squareData: GameSquare;
    index: number;
}

const GameTile: React.FC<Props> = ({ squareData, index }) => {
    const { updateGameSquare, tilesToSwap, setTilesToSwap, swapGameSquares } = useGameBoardStore();
    const [selectedToMove, setSelectedToMove] = useState(false);

    //* Hanterar logik för att byta plats på spelrutor. Klickat index sparas i array.
    //* Anropas setTilesToSwap utan 2 index positioner töms array.
    //* selectedToMove används för att toggla klass i css.
    useEffect(() => {
        if (tilesToSwap.length === 2) {
            if (tilesToSwap[0] === tilesToSwap[1]) {
                return setTilesToSwap();
            }
            swapGameSquares(tilesToSwap[0], tilesToSwap[1]);
            setTilesToSwap();
        }
        if (tilesToSwap[0] === index) {
            setSelectedToMove(true);
        } else {
            setSelectedToMove(false);
        }
    }, [tilesToSwap]);

    return squareData.isRevealed ? (
        <img
            data-tag={index}
            src={squareData.tile.src}
            className={`game-tile__image  ${selectedToMove ? 'game-tile__image--selected' : ''}`}
            onClick={() => setTilesToSwap(index)}
        />
    ) : (
        <button
            data-tag={index}
            className='game-tile'
            onClick={() => updateGameSquare(index, { isRevealed: true })}></button>
    );
};

export default GameTile;
