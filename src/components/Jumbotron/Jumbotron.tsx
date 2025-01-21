import { PREPARATION_TIME, TOTAL_TIME } from '../../constants';
import useGameBoardStore from '../../stores/gameBoardStore';
import useGameStore from '../../stores/gameStore';
import { createGameBoardArray, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import JumbotronInfoField from '../JumbotronInfoField/JumbotronInfoField';
import LevelIndicator from '../LevelIndicator/LevelIndicator';
import './jumbotron.css';

const Jumbotron: React.FC = () => {
    const {
        totalTime,
        points,
        isPreparationTime,
        setIsPreparationTime,
        preparationTime,
        setPreparationTime,
        setTotalTime,
        level,
        setIsGameOver,
        setIsGameRunning,
    } = useGameStore();
    const { setStartingIndex, setEndingIndex, setGameBoardArray } = useGameBoardStore();

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
    };

    return (
        <section className='jumbotron' onClick={startGame}>
            {isPreparationTime ? (
                <LevelIndicator message='AVGÅNG OM' infoNumber={preparationTime} modifier='preparing' />
            ) : (
                <LevelIndicator message='HÅLLPLATS' infoNumber={level} modifier='running' />
            )}
            <JumbotronInfoField variable={totalTime} unit={'SEKUNDER'} src={'./images/hour-glass.svg'} />
            <JumbotronInfoField variable={points} unit={'POÄNG'} src={'./images/star.svg'} />
        </section>
    );
};

export default Jumbotron;
