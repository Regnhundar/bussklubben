import { useState } from 'react';
import './GameTile.css';
import { GameSquare } from '../../interfaces/gameBoard';

interface Props {
    squareData: GameSquare;
    rowKey: string;
    index: number;
}

const GameTile: React.FC<Props> = ({ squareData, rowKey, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return squareData.isRevealed ? (
        <img src={squareData.tile.src} className='game-tile__image' />
    ) : (
        <button className='game-tile' onClick={() => (squareData.isRevealed = true)}></button>
    );
};

export default GameTile;
