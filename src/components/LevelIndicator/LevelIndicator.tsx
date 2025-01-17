import './levelIndicator.css';
interface Props {
    message: string;
    infoNumber: number;
    modifier: string;
}
const LevelIndicator: React.FC<Props> = ({ message, infoNumber, modifier }) => {
    return (
        <article className='level-info'>
            <h1 className={`level-info__message level-info__message--${modifier}`}>{message}</h1>
            <h2 className={`level-info__number level-info__number--${modifier}`}>{infoNumber}</h2>
        </article>
    );
};

export default LevelIndicator;
