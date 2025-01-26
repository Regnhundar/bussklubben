import './gameSquare.css';
import { SquareData } from '../../interfaces/gameBoard';
import useGameBoardStore from '../../stores/gameBoardStore';
import { useEffect, useState } from 'react';
import StartEndIndicator from '../StartEndIndicator/StartEndIndicator';
import useGameStore from '../../stores/gameStore';

interface Props {
    squareData: SquareData;
    index: number;
    finishIndicator: 'up' | 'down' | 'left' | 'right';
    startingIndicator: 'up' | 'down' | 'left' | 'right';
}

const GameSquare: React.FC<Props> = ({ squareData, index, finishIndicator, startingIndicator }) => {
    const {
        updateGameSquare,
        squaresToSwap,
        setSquaresToSwap,
        swapGameSquares,
        startingIndex,
        endingIndex,
        jokerTile,
        setJokerTile,
    } = useGameBoardStore();
    const { isGameOver, isPreparationTime } = useGameStore();
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

    const handleRoadTile = () => {
        if (!jokerTile && !squareData.isPreviousSquare && !squareData.isActive && !isGameOver) {
            setSquaresToSwap(index);
            return;
        }
        if (jokerTile && !squareData.isPreviousSquare && !squareData.isActive && !isGameOver && !isPreparationTime) {
            updateGameSquare(index, { tile: jokerTile });
            setJokerTile(null);
        }
    };

    return squareData.isRevealed ? (
        <img
            data-index={index}
            src={squareData.tile.src}
            className={`game-square__image  ${
                squareData.isPreviousSquare
                    ? 'game-square__image--is-previous'
                    : squareData.isActive
                    ? 'game-square__image--is-active'
                    : selectedToMove
                    ? 'game-square__image--selected'
                    : startingTile
                    ? `game-square__image--starting-square-${startingIndicator}`
                    : endingTile
                    ? `game-square__image--ending-square-${finishIndicator}`
                    : ''
            }

            `}
            onClick={handleRoadTile}
        />
    ) : (
        <button
            data-index={index}
            className='game-square'
            onClick={() => {
                !isGameOver && updateGameSquare(index, { isRevealed: true });
                squaresToSwap.length !== 0 && setSquaresToSwap();
            }}>
            {startingTile && <StartEndIndicator type='start' direction={startingIndicator} />}
            {endingTile && <StartEndIndicator type='finish' direction={finishIndicator} />}
            {index}
        </button>
    );
};

export default GameSquare;
