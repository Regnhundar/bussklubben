import { useEffect, useState } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import GameSquare from '../GameSquare/GameSquare';
import { createGameBoardArray, endPoints, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import './gameBoard.css';

const GameBoard: React.FC = () => {
    const {
        gameBoardArray,
        setGameBoardArray,
        setStartingIndex,
        setEndingIndex,
        startingIndex,
        endingIndex,
        setStartConnectionIndex,
        setFinishConnectionIndex,
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
            setStartConnectionIndex(startEndpoint.successConnection);
        }
        if (endingIndex !== null) {
            const finishEndpoint = endPoints(endingIndex);
            setFinishConnectionIndex(finishEndpoint.successConnection);
            setFinishArrowDirection(finishEndpoint.arrowDirection);
        }
    }, [startingIndex, endingIndex]);

    return (
        <>
            <section className='game-board'>
                {gameBoardArray.map((squareData, i) => (
                    <GameSquare
                        key={i}
                        squareData={squareData}
                        index={i}
                        startingIndicator={startingArrowDirection}
                        finishIndicator={finishArrowDirection}
                    />
                ))}
            </section>
        </>
    );
};

export default GameBoard;
