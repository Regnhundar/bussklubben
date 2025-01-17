import { useEffect, useState } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import GameSquare from '../GameSquare/GameSquare';
import { createGameBoardArray, endPoints, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import './gameBoard.css';

const GameBoard: React.FC = () => {
    const { gameBoardArray, setGameBoardArray, setStartingIndex, setEndingIndex, startingIndex, endingIndex } =
        useGameBoardStore();
    const [startingArrowDirection, setStartingArrowDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');
    const [finishArrowDirection, setFinishArrowDirection] = useState<'down' | 'up' | 'left' | 'right'>('down');

    useEffect(() => {
        const startAndFinishIndex = generateStartAndFinishIndex();
        setGameBoardArray(createGameBoardArray());
        setStartingIndex(startAndFinishIndex.start);
        setEndingIndex(startAndFinishIndex.finish);
    }, []);

    useEffect(() => {
        if (startingIndex !== null) {
            const startIndicator = endPoints(startingIndex);
            setStartingArrowDirection(startIndicator.arrowDirection);
        }
        if (endingIndex !== null) {
            const finishIndicator = endPoints(endingIndex);

            setFinishArrowDirection(finishIndicator.arrowDirection);
        }
        console.log('startingIndex:', startingIndex, 'endingIndex:', endingIndex);
    }, [startingIndex, endingIndex]);

    return (
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
    );
};

export default GameBoard;
