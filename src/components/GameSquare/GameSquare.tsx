import './gameSquare.css';
import { SquareData } from '../../interfaces/gameBoard';
import useGameBoardStore from '../../stores/gameBoardStore';
import { useEffect, useState } from 'react';
import StartEndIndicator from '../StartEndIndicator/StartEndIndicator';

interface Props {
    squareData: SquareData;
    index: number;
}

const GameSquare: React.FC<Props> = ({ squareData, index }) => {
    const { updateGameSquare, squaresToSwap, setSquaresToSwap, swapGameSquares, startingIndex, endingIndex } =
        useGameBoardStore();
    const [selectedToMove, setSelectedToMove] = useState(false);
    const startingTile = index === startingIndex;
    const endingTile = index === endingIndex;
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
            className={`game-square__image  ${
                selectedToMove
                    ? 'game-square__image--selected'
                    : startingTile
                    ? 'game-square__image--starting-square'
                    : endingTile
                    ? 'game-square__image--ending-square'
                    : ''
            }
            `}
            onClick={() => setSquaresToSwap(index)}
        />
    ) : (
        <button
            data-index={index}
            className='game-square'
            onClick={() => updateGameSquare(index, { isRevealed: true })}>
            {startingIndex === index && <StartEndIndicator type='start' direction='down' />}
            {endingIndex === index && <StartEndIndicator type='finish' direction='down' />}
        </button>
    );
};

export default GameSquare;
