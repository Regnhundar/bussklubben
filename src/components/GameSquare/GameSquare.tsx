import './gameSquare.css';
import { SquareData } from '../../interfaces/gameBoard';
import useGameBoardStore from '../../stores/gameBoardStore';
import { useEffect, useState } from 'react';
import StartEndIndicator from '../StartEndIndicator/StartEndIndicator';
import useGameStore from '../../stores/gameStore';
import { jokerRoadTiles } from '../../data/roadTiles';
import { motion } from 'motion/react';
import { squareButtonVariant, squareImgVariant } from '../../motionVariants/variants';
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
        activeJokerTile,
        setActiveJokerTile,
        arrivalIndex,
        finishConnectionIndex,
    } = useGameBoardStore();
    const { isGameOver, isPreparationTime } = useGameStore();
    const [selectedToMove, setSelectedToMove] = useState(false);
    const startingTile = index === startingIndex;
    const endingTile = index === endingIndex;

    //* Hanterar logik för att byta plats på spelrutor. Klickat index sparas i array.
    //* Anropas setSquaresToSwap utan 2 index positioner töms array.
    //* selectedToMove används för att toggla klass i css.
    useEffect(() => {
        handleSwapSquarePositions();
    }, [squaresToSwap]);

    const handleSwapSquarePositions = () => {
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
    };

    const handleJokerTile = () => {
        if (!jokerTile && !squareData.isPreviousSquare && !squareData.isActive && !isGameOver) {
            setSquaresToSwap(index);
            return;
        }
        if (jokerTile && !squareData.isPreviousSquare && !squareData.isActive && !isGameOver && !isPreparationTime) {
            updateGameSquare(index, { tile: jokerTile });
            activeJokerTile === jokerRoadTiles.length - 1
                ? setActiveJokerTile(0)
                : setActiveJokerTile((prev) => prev + 1);
            setJokerTile(null);
        }
    };

    return squareData.isRevealed ? (
        <div className='game-square-wrapper'>
            <motion.img
                variants={squareImgVariant}
                data-index={index}
                src={squareData.tile.src}
                alt={squareData.tile.alt}
                className={`game-square__image  ${
                    squareData.isPreviousSquare
                        ? 'game-square__image--is-previous'
                        : squareData.isActive
                        ? 'game-square__image--is-active'
                        : jokerTile !== null
                        ? 'game-square__image--is-changeable'
                        : selectedToMove
                        ? 'game-square__image--selected'
                        : squareData.isLinkedToStart
                        ? 'game-square__image--connected'
                        : startingTile && arrivalIndex !== null && squareData.tile.connections[arrivalIndex] === true
                        ? `game-square__image--starting-square-connected`
                        : startingTile && arrivalIndex !== null && squareData.tile.connections[arrivalIndex] === false
                        ? `game-square__image--starting-square-unconnected`
                        : endingTile &&
                          finishConnectionIndex !== null &&
                          squareData.tile.connections[finishConnectionIndex] === true
                        ? `game-square__image--ending-square-connected`
                        : endingTile &&
                          finishConnectionIndex !== null &&
                          squareData.tile.connections[finishConnectionIndex] === false
                        ? `game-square__image--ending-square-unconnected`
                        : ''
                }
            
            `}
                onClick={handleJokerTile}
            />
            {startingTile && (
                <StartEndIndicator
                    type='start'
                    direction={startingIndicator}
                    isRevealed={true}
                    isConnected={arrivalIndex !== null && squareData.tile.connections[arrivalIndex] === true}
                />
            )}
            {endingTile && (
                <StartEndIndicator
                    type='finish'
                    direction={finishIndicator}
                    isRevealed={true}
                    isConnected={
                        finishConnectionIndex !== null && squareData.tile.connections[finishConnectionIndex] === true
                    }
                />
            )}
        </div>
    ) : (
        <motion.button
            variants={squareButtonVariant}
            initial='hidden'
            animate='show'
            exit='exit'
            custom={squareData.delay}
            data-index={index}
            aria-label='En knapp som kommer att visa en dold vägbit.'
            className='game-square'
            onClick={() => {
                !isGameOver && updateGameSquare(index, { isRevealed: true });
                squaresToSwap.length !== 0 && setSquaresToSwap();
            }}>
            {startingTile && <StartEndIndicator type='start' direction={startingIndicator} isRevealed={false} />}
            {endingTile && <StartEndIndicator type='finish' direction={finishIndicator} isRevealed={false} />}
        </motion.button>
    );
};

export default GameSquare;
