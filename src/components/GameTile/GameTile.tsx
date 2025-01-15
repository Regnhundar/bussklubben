import './GameTile.css';
import { GameSquare } from '../../interfaces/gameBoard';
import useGameBoardStore from '../../stores/gameBoardStore';
import { useEffect } from 'react';

interface Props {
    squareData: GameSquare;
    index: number;
}

const GameTile: React.FC<Props> = ({ squareData, index }) => {
    const { updateGameSquare, tilesToSwap, setTilesToSwap, swapGameSquares } = useGameBoardStore();

    const handleTileMove = () => {
        if (tilesToSwap.length > 1) {
            setTilesToSwap();
        }
        setTilesToSwap(index);
    };

    useEffect(() => {
        if (tilesToSwap.length === 2) {
            swapGameSquares(tilesToSwap[0], tilesToSwap[1]);
        }
    }, [tilesToSwap]);

    return squareData.isRevealed ? (
        <img data-tag={index} src={squareData.tile.src} className='game-tile__image' onClick={handleTileMove} />
    ) : (
        <button
            data-tag={index}
            className='game-tile'
            onClick={() => updateGameSquare(index, { isRevealed: true })}></button>
    );
};

export default GameTile;
