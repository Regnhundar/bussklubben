import useGameStore from '../../stores/gameStore';
import JumbotronInfoField from '../JumbotronInfoField/JumbotronInfoField';
import LevelIndicator from '../LevelIndicator/LevelIndicator';
import './jumbotron.css';

const Jumbotron: React.FC = () => {
    const { totalTime, points, isPreparationTime, setIsPreparationTime, preparationTime, level } = useGameStore();

    //! ******* OBS: TA BORT togglePrepTime. BARA FÖR TEST! *******

    const togglePrepTime = () => {
        setIsPreparationTime((prev) => !prev);
    };

    return (
        <section className='jumbotron' onClick={togglePrepTime}>
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
