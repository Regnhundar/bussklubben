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
        preparationTime,
        level,
        setIsGameRunning,
        setIsGameOver,
        setPreparationTime,
        setTotalTime,
        setIsPreparationTime,
        setPoints,
        setLevel,
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
        setTotalTime(TOTAL_TIME);
        setPoints(0);
        setLevel(1);
    };
    return (
        <section className='jumbotron' onClick={startGame}>
            {isPreparationTime ? (
                <LevelIndicator
                    message='AVGÅNG OM'
                    infoNumber={preparationTime}
                    modifier='preparing'
                    type='departure'
                />
            ) : (
                <LevelIndicator message='HÅLLPLATS' infoNumber={level} modifier='running' type='bus-stop' />
            )}
            <JumbotronInfoField variable={totalTime} unit={'SEKUNDER'} src={'./images/hour-glass.svg'} type='timer' />
            <JumbotronInfoField variable={points} unit={'POÄNG'} src={'./images/star.svg'} type='points' />
        </section>
    );
};

export default Jumbotron;
