import { useEffect, useRef, useState } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import GameSquare from '../GameSquare/GameSquare';
import { createGameBoardArray, endPoints, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import './gameBoard.css';
import { AnimatePresence, motion } from 'motion/react';
import { gameboardVariant } from '../../motionVariants/variants';
import Bus from '../Bus/Bus';
import { testGameBoard1 } from '../../data/roadTiles';
import useGameStore from '../../stores/gameStore';

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
        setFinishConnectionIndex,
        setNextSquareToCheckIndex,
        setArrivalIndex,
        nextSquareToCheckIndex,
    } = useGameBoardStore();

    const [startingArrowDirection, setStartingArrowDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
    const [finishArrowDirection, setFinishArrowDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
    const [leftOrRight, setleftOrRight] = useState<string | null>(null);
    const [upOrDown, setUpOrDown] = useState<string | null>(null);
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
            setStartingArrowDirection(startEndpoint.arrowDirection);

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
            setArrivalIndex(startEndpoint.successConnection);
            // setArrivalIndex(1);
        }
        if (endingIndex !== null) {
            const finishEndpoint = endPoints(endingIndex);
            setFinishArrowDirection(finishEndpoint.arrowDirection);
            setFinishConnectionIndex(finishEndpoint.successConnection);
            // setFinishConnectionIndex(3);
        }
    }, [startingIndex, endingIndex]);

    useEffect(() => {
        if (nextSquareToCheckIndex !== null && startingIndex !== null && squareSize > 0) {
            const y = Math.floor(nextSquareToCheckIndex / GRID_ROWS) * squareSize;
            const x = (nextSquareToCheckIndex % GRID_COLUMNS) * squareSize;
            if (yCoordinate !== null && xCoordinate !== null && nextSquareToCheckIndex !== startingIndex) {
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
            setXcoordinate(x);
            setYcoordinate(y);
        }
    }, [nextSquareToCheckIndex, squareSize]);

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
