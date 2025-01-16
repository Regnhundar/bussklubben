import { useEffect } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import GameSquare from '../GameSquare/GameSquare';
import './gameBoard.css';
import { createGameBoardArray } from '../../utils/utilityFunctions';

const GameBoard: React.FC = () => {
    const { gameBoardArray, setGameBoardArray } = useGameBoardStore();

    useEffect(() => {
        setGameBoardArray(createGameBoardArray());
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
