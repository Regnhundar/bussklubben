import { Ability } from '../../interfaces/ability';
import './abilityButton.css';
interface Props {
    ability: Ability;
}
const AbilityButton: React.FC<Props> = ({ ability }) => {
    return (
        <div className={`ability ability--${ability.name}`} onClick={ability.func}>
            <button className='ability__button'>
                <img src={ability.src} alt={ability.alt} className='ability-button__image' />
            </button>
            <h3 className='ability-button__name'>{ability.name.toUpperCase()}</h3>
        </div>
    );
};

export default AbilityButton;
