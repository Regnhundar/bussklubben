import './abilityBar.css';
import AbilityButton from '../AbilityButton/AbilityButton';

const AbilityBar: React.FC = () => {
    return (
        <div className='ability-bar'>
            <AbilityButton />
            <AbilityButton />
            <AbilityButton />
        </div>
    );
};

export default AbilityBar;
