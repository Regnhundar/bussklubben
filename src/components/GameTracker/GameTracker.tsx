import useGameStore from '../../stores/gameStore';
import HudInfo from '../HudInfo/HudInfo';
import LevelIndicator from '../LevelIndicator/LevelIndicator';
import './gameTracker.css';

const GameTracker: React.FC = () => {
    const { totalTime, points } = useGameStore();
    return (
        <section className='game-tracker'>
            <LevelIndicator />
            <HudInfo variable={totalTime} unit={'SEKUNDER'} src={'./images/hour-glass.svg'} />
            <HudInfo variable={points} unit={'POÄNG'} src={'./images/star.svg'} />
        </section>
    );
};

export default GameTracker;
