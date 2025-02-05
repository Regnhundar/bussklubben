import useGameStore from '../../stores/gameStore';
import './newLevelMessage.css';
const NewLevelMessage: React.FC = () => {
    const { level } = useGameStore();
    return <h1 className='new-level-message'>HÅLLPLATS: {level}</h1>;
};

export default NewLevelMessage;
