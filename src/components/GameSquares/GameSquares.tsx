import { GameBoard } from '../../interfaces/gameBoard';
import GameTile from '../GameTile/GameTile';
import './gameSquares.css';

const gameBoard: GameBoard = {
    row5: [
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
    ],
    row4: [
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
    ],
    row3: [
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
    ],
    row2: [
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
    ],
    row1: [
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
        { isActive: false, isRevealed: false, timer: 1, connections: [false, true, false, true] },
    ],
};
const GameSquares: React.FC = () => {
    console.log(Object.keys(gameBoard));

    return (
        <section className='game-board'>
            {Object.keys(gameBoard).map((rowKey) => (
                <section key={rowKey} className='game-board__row'>
                    {gameBoard[rowKey as keyof GameBoard].map((squareData, i) => (
                        <GameTile key={i} squareData={squareData} />
                    ))}
                </section>
            ))}
        </section>
    );
};

export default GameSquares;
