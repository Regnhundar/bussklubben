import { useEffect, useRef, useState } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import GameSquare from '../GameSquare/GameSquare';
import { createGameBoardArray, endPoints, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import './gameBoard.css';
import { AnimatePresence, motion } from 'motion/react';
import { gameboardVariant } from '../../motionVariants/variants';
import Bus from '../Bus/Bus';
// import { testGameBoard1 } from '../../data/roadTiles';

const GRID_COLUMNS = 5;
const GRID_ROWS = 5;

const GameBoard: React.FC = () => {
    const {
        gameBoardArray,
        setGameBoardArray,
        setStartingIndex,
        setEndingIndex,
        startingIndex,
        endingIndex,
        finishConnectionIndex,
        setFinishConnectionIndex,
        setNextSquareToCheckIndex,
        setArrivalIndex,
        nextSquareToCheckIndex,
        isExiting,
    } = useGameBoardStore();

    const [startingArrowDirection, setStartingArrowDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
    const [finishArrowDirection, setFinishArrowDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
    const [leftOrRight, setleftOrRight] = useState<'left' | 'right' | null>(null);
    const [upOrDown, setUpOrDown] = useState<'up' | 'down' | null>(null);
    const [direction, setDirection] = useState<'horizontal' | 'vertical' | null>(null);

    const gameBoardRef = useRef<HTMLElement | null>(null);

    const [squareSize, setSquareSize] = useState(0);
    const [xCoordinate, setXcoordinate] = useState<number | null>(null);
    const [yCoordinate, setYcoordinate] = useState<number | null>(null);

    useEffect(() => {
        const startAndFinishIndex = generateStartAndFinishIndex();
        const gameBoard = createGameBoardArray();
        setStartingIndex(startAndFinishIndex.start);
        setEndingIndex(startAndFinishIndex.finish);
        setGameBoardArray(gameBoard);
        // setStartingIndex(24);
        // setEndingIndex(0);
        // setGameBoardArray(testGameBoard1);

        const updateSquareSize = () => {
            if (gameBoardRef.current) {
                const boardWidth = gameBoardRef.current.clientWidth;
                const boardHeight = gameBoardRef.current.clientHeight;
                const newSquareSize = Math.min(boardWidth / GRID_COLUMNS, boardHeight / GRID_ROWS);
                setSquareSize(newSquareSize);
            }
        };

        updateSquareSize();
        window.addEventListener('resize', updateSquareSize);
        return () => window.removeEventListener('resize', updateSquareSize);
    }, []);

    useEffect(() => {
        if (startingIndex !== null) {
            const startEndpoint = endPoints(startingIndex);

            switch (startEndpoint.arrowDirection) {
                case 'up':
                    setUpOrDown('up');
                    setDirection('vertical');
                    break;
                case 'down':
                    setUpOrDown('down');
                    setDirection('vertical');
                    break;
                case 'right':
                    setleftOrRight('left');
                    setDirection('horizontal');
                    break;
                default:
                    setleftOrRight('right');
                    setDirection('horizontal');
            }

            setNextSquareToCheckIndex(startingIndex);
            setStartingArrowDirection(startEndpoint.arrowDirection);
            setArrivalIndex(startEndpoint.successConnection);
            // setStartingArrowDirection('right');
            // setArrivalIndex(1);
        }
        if (endingIndex !== null) {
            const finishEndpoint = endPoints(endingIndex);
            setFinishArrowDirection(finishEndpoint.arrowDirection);
            setFinishConnectionIndex(finishEndpoint.successConnection);
            // setFinishArrowDirection('left');
            // setFinishConnectionIndex(3);
        }
    }, [startingIndex, endingIndex]);

    useEffect(() => {
        if (nextSquareToCheckIndex !== null && startingIndex !== null && endingIndex !== null && squareSize > 0) {
            const y = Math.floor(nextSquareToCheckIndex / GRID_ROWS) * squareSize;
            const x = (nextSquareToCheckIndex % GRID_COLUMNS) * squareSize;
            if (
                yCoordinate !== null &&
                xCoordinate !== null &&
                nextSquareToCheckIndex !== startingIndex &&
                !isExiting
            ) {
                if (y < yCoordinate) {
                    setUpOrDown('down');
                    setDirection('vertical');
                }
                if (y > yCoordinate) {
                    setUpOrDown('up');
                    setDirection('vertical');
                }

                if (x > xCoordinate) {
                    setleftOrRight('right');
                    setDirection('horizontal');
                }
                if (x < xCoordinate) {
                    setleftOrRight('left');
                    setDirection('horizontal');
                }
            }
            if (isExiting) {
                switch (finishConnectionIndex) {
                    case 0:
                        setUpOrDown('down');
                        setDirection('vertical');
                        break;
                    case 2:
                        setUpOrDown('up');
                        setDirection('vertical');
                        break;
                    case 1:
                        setleftOrRight('right');
                        setDirection('horizontal');
                        break;
                    default:
                        setleftOrRight('left');
                        setDirection('horizontal');
                }
                console.log('isExiting:');
            }
            setXcoordinate(x);
            setYcoordinate(y);
        }
    }, [nextSquareToCheckIndex, squareSize, isExiting]);

    return (
        <>
            <motion.section
                ref={gameBoardRef}
                variants={gameboardVariant}
                initial='hidden'
                animate='show'
                exit='hidden'
                className='game-board'>
                <AnimatePresence>
                    {xCoordinate !== null && yCoordinate !== null && (
                        <Bus
                            x={xCoordinate}
                            y={yCoordinate}
                            upOrDown={upOrDown}
                            leftOrRight={leftOrRight}
                            direction={direction}
                            squareSize={squareSize}
                        />
                    )}
                    {gameBoardArray.map((squareData, i) => (
                        <GameSquare
                            key={i}
                            squareData={squareData}
                            index={i}
                            startingIndicator={startingArrowDirection}
                            finishIndicator={finishArrowDirection}
                        />
                    ))}
                </AnimatePresence>
            </motion.section>
        </>
    );
};

export default GameBoard;
