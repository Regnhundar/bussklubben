import useGameStore from '../../stores/gameStore';
interface Props {
    startFunction: () => void;
}
import './gameOver.css';
const GameOver: React.FC<Props> = ({ startFunction }) => {
    const { totalTime, points } = useGameStore();

    return (
        <section className='game-over'>
            <h2 className='game-over__title'>GAME OVER MAN!</h2>
            <h3 className='game-over__reason'>{totalTime === 0 ? 'TIMES UP' : 'END OF THE ROAD!'}</h3>
            <h4 className='game-over__reason'>{`Du fick ${points} poäng`}</h4>
            <button className='game-over__replay-button' onClick={startFunction}>
                SPELA IGEN
            </button>
        </section>
    );
};

export default GameOver;
