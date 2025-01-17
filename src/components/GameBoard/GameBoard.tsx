import { useEffect } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import GameSquare from '../GameSquare/GameSquare';
import './gameBoard.css';
import { createGameBoardArray, generateStartAndFinishIndex } from '../../utils/utilityFunctions';

const GameBoard: React.FC = () => {
    const { gameBoardArray, setGameBoardArray, setStartingIndex, setEndingIndex } = useGameBoardStore();

    useEffect(() => {
        const startAndFinishIndex = generateStartAndFinishIndex();
        setGameBoardArray(createGameBoardArray());
        setStartingIndex(startAndFinishIndex.start);
        setEndingIndex(startAndFinishIndex.finish);
    }, []);

    return (
        <section className='game-board'>
            {gameBoardArray.map((squareData, i) => (
                <GameSquare key={i} squareData={squareData} index={i} />
            ))}
        </section>
    );
};

export default GameBoard;
