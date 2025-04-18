import './gameSquare.css';
import { SquareData } from '../../interfaces/gameBoard';
import useGameBoardStore from '../../stores/gameBoardStore';
import { useEffect, useState, useCallback } from 'react';
import StartEndIndicator from '../StartEndIndicator/StartEndIndicator';
import useGameStore from '../../stores/gameStore';
import { jokerRoadTiles } from '../../data/roadTiles';
import { motion } from 'motion/react';
import { squareButtonVariant } from '../../motionVariants/variants';

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
        setTriggerPath,
        gameBoardArray,
    } = useGameBoardStore();
    const { isGameOverConfirmation, isGameOver, isPreparationTime } = useGameStore();
    const [selectedToMove, setSelectedToMove] = useState(false);

    const startingTile = index === startingIndex;
    const endingTile = index === endingIndex;

    const isFinalSquareLinked = useCallback(() => {
        if (endingIndex === null || finishConnectionIndex === null) return false;
        const endingTileData = gameBoardArray[endingIndex];
        return (
            endingTileData.isRevealed &&
            endingTileData.isLinkedToStart &&
            endingTileData.tile.connections[finishConnectionIndex] === true
        );
    }, [endingIndex, finishConnectionIndex, gameBoardArray]);

    //* Hanterar logik för att byta plats på spelrutor. Klickat index sparas i array.
    //* Anropas setSquaresToSwap utan 2 index positioner töms array.
    //* selectedToMove används för att toggla klass i css.
    useEffect(() => {
        handleSwapSquarePositions();
    }, [squaresToSwap]);

    const handleSwapSquarePositions = useCallback(() => {
        if (squaresToSwap.length === 2) {
            const [first, second] = squaresToSwap;
            if (first === second) {
                setSquaresToSwap();
                return;
            }
            swapGameSquares(first, second);
            setTriggerPath((prev) => prev + 1); // Triggar pathcontrol, dvs vilka rutor som är kopplade från start.
            setSquaresToSwap();
        }
        setSelectedToMove(squaresToSwap[0] === index);
    }, [squaresToSwap, index, swapGameSquares, setSquaresToSwap, setTriggerPath]);

    const handleJokerTile = () => {
        if (!jokerTile && !squareData.isActive && !isGameOver) {
            setSquaresToSwap(index);
            return;
        }
        if (jokerTile && !squareData.isActive && !isGameOver && !isPreparationTime) {
            updateGameSquare(index, { tile: jokerTile });
            activeJokerTile === jokerRoadTiles.length - 1
                ? setActiveJokerTile(0)
                : setActiveJokerTile((prev) => prev + 1);
            setJokerTile(null);
            setTriggerPath((prev) => prev + 1); // Triggar pathcontrol, dvs vilka rutor som är kopplade från start.
        }
    };
    const handleSquareReveal = () => {
        if (!isGameOver) {
            setTriggerPath((prev) => prev + 1); // Triggar pathcontrol, dvs vilka rutor som är kopplade från start.
            updateGameSquare(index, { isRevealed: true });
            squaresToSwap.length !== 0 && setSquaresToSwap();
        }
    };

    return squareData.isRevealed ? (
        <div
            data-index={index}
            className={
                isGameOverConfirmation
                    ? 'game-square-wrapper game-square-wrapper--disabled'
                    : `game-square-wrapper  ${
                          squareData.isActive
                              ? 'game-square-wrapper--is-active'
                              : jokerTile !== null
                              ? 'game-square-wrapper--is-changeable'
                              : selectedToMove
                              ? 'game-square-wrapper--selected'
                              : isFinalSquareLinked() && squareData.isLinkedToStart
                              ? 'game-square-wrapper--clear-path'
                              : endingTile &&
                                finishConnectionIndex !== null &&
                                squareData.tile.connections[finishConnectionIndex] === false
                              ? `game-square-wrapper--ending-square-unconnected`
                              : squareData.isRevealed && squareData.isLinkedToStart
                              ? 'game-square-wrapper--connected'
                              : startingTile &&
                                arrivalIndex !== null &&
                                squareData.tile.connections[arrivalIndex] === true
                              ? `game-square-wrapper--starting-square-connected`
                              : startingTile &&
                                arrivalIndex !== null &&
                                squareData.tile.connections[arrivalIndex] === false
                              ? `game-square-wrapper--starting-square-unconnected`
                              : endingTile &&
                                finishConnectionIndex !== null &&
                                squareData.tile.connections[finishConnectionIndex] === true
                              ? `game-square-wrapper--ending-square-connected`
                              : ''
                      }`
            }>
            <img
                src={squareData.tile.src}
                alt={squareData.tile.alt}
                className={'game-square__image'}
                onClick={handleJokerTile}
            />
            {startingTile && (
                <StartEndIndicator
                    type='start'
                    direction={startingIndicator}
                    isRevealed={true}
                    isConnected={arrivalIndex !== null && squareData.tile.connections[arrivalIndex] === true}
                    isActive={squareData.isActive}
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
                    isActive={squareData.isActive}
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
            className={isGameOverConfirmation ? 'game-square game-square--disabled' : 'game-square'}
            onClick={handleSquareReveal}
            disabled={isGameOverConfirmation}>
            {startingTile && (
                <StartEndIndicator
                    type='start'
                    direction={startingIndicator}
                    isRevealed={false}
                    isAnimated={!isGameOverConfirmation}
                />
            )}
            {endingTile && (
                <StartEndIndicator
                    type='finish'
                    direction={finishIndicator}
                    isRevealed={false}
                    isAnimated={!isGameOverConfirmation}
                />
            )}
        </motion.button>
    );
};

export default GameSquare;
