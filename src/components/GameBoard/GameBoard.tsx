import { useEffect, useState } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import GameSquare from '../GameSquare/GameSquare';
import { createGameBoardArray, endPoints, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import './gameBoard.css';
import useGameStore from '../../stores/gameStore';
import { AnimatePresence, motion } from 'motion/react';

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
    } = useGameBoardStore();
    const { isGameOver } = useGameStore();
    const [startingArrowDirection, setStartingArrowDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
    const [finishArrowDirection, setFinishArrowDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');

    useEffect(() => {
        const startAndFinishIndex = generateStartAndFinishIndex();
        const gameBoard = createGameBoardArray();
        setStartingIndex(startAndFinishIndex.start);
        setEndingIndex(startAndFinishIndex.finish);
        setGameBoardArray(gameBoard);
    }, []);

    useEffect(() => {
        if (startingIndex !== null) {
            const startEndpoint = endPoints(startingIndex);
            setStartingArrowDirection(startEndpoint.arrowDirection);
            setNextSquareToCheckIndex(startingIndex);
            setArrivalIndex(startEndpoint.successConnection);
        }
        if (endingIndex !== null) {
            const finishEndpoint = endPoints(endingIndex);
            setFinishConnectionIndex(finishEndpoint.successConnection);
            setFinishArrowDirection(finishEndpoint.arrowDirection);
        }
    }, [startingIndex, endingIndex]);

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
        },
    };

    return (
        <>
            <motion.section
                variants={staggerContainer}
                initial='hidden'
                animate='show'
                exit='hidden'
                className='game-board'>
                <AnimatePresence>
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
