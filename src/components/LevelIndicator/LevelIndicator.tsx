import useGameStore from '../../stores/gameStore';
import './levelIndicator.css';
interface Props {
    message: string;
    infoNumber: number;
    modifier: string;
    type: 'departure' | 'bus-stop';
}
const LevelIndicator: React.FC<Props> = ({ message, infoNumber, modifier, type }) => {
    const { preparationTime } = useGameStore();

    const typeClass = type === 'departure' && preparationTime <= 5 ? 'level-info--soon-to-leave' : '';
    return (
        <article className={`level-info ${typeClass}`}>
            <h1 className={`level-info__message level-info__message--${modifier}`}>{message}</h1>
            <h2 className={`level-info__number level-info__number--${modifier}`}>{infoNumber}</h2>
        </article>
    );
};

export default LevelIndicator;
