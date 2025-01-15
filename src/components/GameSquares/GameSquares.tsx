import { gameBoard } from '../../data/gameBoard';
import { GameBoard } from '../../interfaces/gameBoard';
import GameTile from '../GameTile/GameTile';
import './gameSquares.css';

const GameSquares: React.FC = () => {
    // console.log(Object.keys(gameBoard));

    return (
        <section className='game-board'>
            {Object.keys(gameBoard).map((rowKey) => (
                <section key={rowKey} className={`game-board__row game-board__row--${rowKey}`}>
                    {gameBoard[rowKey as keyof GameBoard].map((squareData, i) => (
                        <GameTile key={i} squareData={squareData} rowKey={rowKey} index={i} />
                    ))}
                </section>
            ))}
        </section>
    );
};

export default GameSquares;
