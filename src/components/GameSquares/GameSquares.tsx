// import { gameBoard } from '../../data/gameBoard';
import { useEffect } from 'react';
// import { GameBoard, GameSquare } from '../../interfaces/gameBoard';
import useGameBoardStore from '../../stores/gameBoardStore';
import GameTile from '../GameTile/GameTile';
import './gameSquares.css';
import { createGameBoardArray } from '../../utils/utilityFunctions';

const GameSquares: React.FC = () => {
    // console.log(Object.keys(gameBoard));
    const { gameBoard, setGameBoard } = useGameBoardStore();

    useEffect(() => {
        const gameBoardArray = createGameBoardArray();
        setGameBoard(gameBoardArray);
    }, []);
    return (
        <section className='game-board'>
            {gameBoard.map((gameSquare, i) => (
                <GameTile key={i} squareData={gameSquare} index={i} />
            ))}
        </section>
        // <section className='game-board'>
        //     {Object.keys(gameBoard).map((rowKey) => (
        //         <section key={rowKey} className={`game-board__row game-board__row--${rowKey}`}>
        //             {gameBoard[rowKey as keyof GameBoard].map((squareData, i) => (
        //                 <GameTile key={i} squareData={squareData} rowKey={rowKey} index={i} />
        //             ))}
        //         </section>
        //     ))}
        // </section>
    );
};

export default GameSquares;
