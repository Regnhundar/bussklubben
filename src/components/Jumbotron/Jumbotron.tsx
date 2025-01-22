import useGameStore from '../../stores/gameStore';
import JumbotronInfoField from '../JumbotronInfoField/JumbotronInfoField';
import LevelIndicator from '../LevelIndicator/LevelIndicator';
import './jumbotron.css';

const Jumbotron: React.FC = () => {
    const { totalTime, points, isPreparationTime, preparationTime, level } = useGameStore();

    return (
        <section className='jumbotron'>
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
