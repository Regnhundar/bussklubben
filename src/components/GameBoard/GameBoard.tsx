import { useEffect, useState } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import GameSquare from '../GameSquare/GameSquare';
import { createGameBoardArray, endPoints, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import './gameBoard.css';
import GameOver from '../GameOver/GameOver';
import useGameStore from '../../stores/gameStore';
import { AnimatePresence, motion } from 'motion/react';
interface Props {
    startFunction: () => void;
}
const GameBoard: React.FC<Props> = ({ startFunction }) => {
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
        hidden: { scale: 1 },
        show: {
            scale: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0,
            },
        },
    };

    return (
        <>
            {isGameOver ? (
                <GameOver startFunction={startFunction} />
            ) : (
                <motion.section variants={staggerContainer} initial='hidden' animate='show' className='game-board'>
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
            )}
        </>
    );
};

export default GameBoard;
