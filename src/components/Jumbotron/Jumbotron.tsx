import useGameStore from '../../stores/gameStore';
import JumbotronInfoField from '../JumbotronInfoField/JumbotronInfoField';
import LevelIndicator from '../LevelIndicator/LevelIndicator';
import './jumbotron.css';

const Jumbotron: React.FC = () => {
    const { totalTime, points, isPreparationTime, preparationTime, level } = useGameStore();

    return (
        <section className='jumbotron'>
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
