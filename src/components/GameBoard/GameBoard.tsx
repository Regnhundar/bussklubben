import { useEffect, useState } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import GameSquare from '../GameSquare/GameSquare';
import { createGameBoardArray, endPoints, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import './gameBoard.css';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { gameboardVariant } from '../../motionVariants/variants';

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

    return (
        <>
            <motion.section
                variants={gameboardVariant}
                initial='hidden'
                animate='show'
                exit='hidden'
                className='game-board'>
                <AnimatePresence>
                    <LayoutGroup>
                        {gameBoardArray.map((squareData, i) => (
                            <GameSquare
                                key={i}
                                squareData={squareData}
                                index={i}
                                startingIndicator={startingArrowDirection}
                                finishIndicator={finishArrowDirection}
                            />
                        ))}
                    </LayoutGroup>
                </AnimatePresence>
            </motion.section>
        </>
    );
};

export default GameBoard;
