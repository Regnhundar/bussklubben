import './gameSquare.css';
import { SquareData } from '../../interfaces/gameBoard';
import useGameBoardStore from '../../stores/gameBoardStore';
import { useEffect, useState } from 'react';

interface Props {
    squareData: SquareData;
    index: number;
}

const GameSquare: React.FC<Props> = ({ squareData, index }) => {
    const { updateGameSquare, squaresToSwap, setSquaresToSwap, swapGameSquares } = useGameBoardStore();
    const [selectedToMove, setSelectedToMove] = useState(false);

    //* Hanterar logik för att byta plats på spelrutor. Klickat index sparas i array.
    //* Anropas setSquaresToSwap utan 2 index positioner töms array.
    //* selectedToMove används för att toggla klass i css.
    useEffect(() => {
        if (squaresToSwap.length === 2) {
            if (squaresToSwap[0] === squaresToSwap[1]) {
                return setSquaresToSwap();
            }
            swapGameSquares(squaresToSwap[0], squaresToSwap[1]);
            setSquaresToSwap();
        }
        if (squaresToSwap[0] === index) {
            setSelectedToMove(true);
        } else {
            setSelectedToMove(false);
        }
    }, [squaresToSwap]);

    return squareData.isRevealed ? (
        <img
            data-index={index}
            src={squareData.tile.src}
            className={`game-square__image  ${selectedToMove ? 'game-square__image--selected' : ''}`}
            onClick={() => setSquaresToSwap(index)}
        />
    ) : (
        <button
            data-index={index}
            className='game-square'
            onClick={() => updateGameSquare(index, { isRevealed: true })}></button>
    );
};

export default GameSquare;
