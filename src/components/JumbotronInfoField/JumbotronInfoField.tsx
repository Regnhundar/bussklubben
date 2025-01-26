import useGameStore from '../../stores/gameStore';
import './jumbotronInfoField.css';
interface Props {
    variable: number;
    unit: string;
    src: string;
    type: 'timer' | 'points';
}
const JumbotronInfoField: React.FC<Props> = ({ variable, unit, src, type }) => {
    const { isPreparationTime, isGameOver, totalTime } = useGameStore();
    const finalSeconds =
        !isPreparationTime && type === 'timer' && totalTime <= 5 ? 'jumbotron-info-field__data--final-seconds' : '';
    return (
        <figure className={`jumbotron-info-field ${isPreparationTime ? 'jumbotron-info-field--preparing' : ''}`}>
            <img className='jumbotron-info-field__icon' src={src} alt='' />
            <div className='jumbotron-info-field__wrapper'>
                <h2 className={`jumbotron-info-field__data ${finalSeconds}`}>{variable}</h2>
                <h3 className='jumbotron-info-field__unit-info'>{unit}</h3>
            </div>
        </figure>
    );
};

export default JumbotronInfoField;
