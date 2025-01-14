import { useState } from 'react';
import './GameTile.css';
import { GameSquare } from '../../interfaces/gameBoard';

interface Props {
    squareData: GameSquare;
}
const GameTile: React.FC<Props> = ({ squareData }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return isFlipped ? (
        <img className='game-tile__image' />
    ) : (
        <button className='game-tile' onClick={() => setIsFlipped(true)}></button>
    );
};

export default GameTile;
