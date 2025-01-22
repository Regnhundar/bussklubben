import { PREPARATION_TIME, TOTAL_TIME } from '../../constants';
import useGameBoardStore from '../../stores/gameBoardStore';
import useGameStore from '../../stores/gameStore';
import { createGameBoardArray, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import './gameOver.css';
const GameOver: React.FC = () => {
    const { setGameBoardArray, setStartingIndex, setEndingIndex } = useGameBoardStore();
    const {
        setIsGameOver,
        setIsGameRunning,
        setIsPreparationTime,
        setTotalTime,
        setPreparationTime,
        setPoints,
        setLevel,
        totalTime,
        points,
    } = useGameStore();
    const startGame = () => {
        const startAndFinishIndex = generateStartAndFinishIndex();
        const gameBoard = createGameBoardArray();
        setIsGameRunning(true);
        setIsGameOver(false);
        setStartingIndex(startAndFinishIndex.start);
        setEndingIndex(startAndFinishIndex.finish);
        setGameBoardArray(gameBoard);
        setPreparationTime(PREPARATION_TIME);
        setTotalTime(TOTAL_TIME);
        setIsPreparationTime(true);
        setTotalTime(TOTAL_TIME);
        setPoints(0);
        setLevel(1);
    };
    return (
        <section className='game-over'>
            <h2 className='game-over__title'>GAME OVER MAN!</h2>
            <h3 className='game-over__reason'>{totalTime === 0 ? 'TIMES UP' : 'END OF THE ROAD!'}</h3>
            <h4 className='game-over__reason'>{`Du fick ${points} poäng`}</h4>
            <button className='game-over__replay-button' onClick={startGame}>
                SPELA IGEN
            </button>
        </section>
    );
};

export default GameOver;
