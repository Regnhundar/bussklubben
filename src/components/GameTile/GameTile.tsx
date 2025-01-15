import './GameTile.css';
import { GameSquare } from '../../interfaces/gameBoard';
import useGameBoardStore from '../../stores/gameBoardStore';

interface Props {
    squareData: GameSquare;
    index: number;
}

const GameTile: React.FC<Props> = ({ squareData, index }) => {
    const { updateGameSquare, gameBoard } = useGameBoardStore();
    let tilePositions: number[] = [];
    const handleTileMove = () => {
        if (tilePositions.length > 1) {
            tilePositions = [];
        }
        tilePositions = [...tilePositions, index];

        console.log(tilePositions);
    };
    return squareData.isRevealed ? (
        <img src={squareData.tile.src} className='game-tile__image' onClick={handleTileMove} />
    ) : (
        <button className='game-tile' onClick={() => updateGameSquare(index, { isRevealed: true })}></button>
    );
};

export default GameTile;
