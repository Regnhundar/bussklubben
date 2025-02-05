import { Ability } from '../../interfaces/ability';
import './abilityButton.css';
interface Props {
    ability: Ability;
}
const AbilityButton: React.FC<Props> = ({ ability }) => {
    return (
        <div className={`ability ability--${ability.class}`} onClick={ability.func}>
            <button className={`ability__button ${ability.state}`}>
                <img src={ability.src} alt={ability.alt} className='ability-button__image' />
            </button>
            <h3
                className={`ability-button__name ${
                    ability.state === 'ability__button--disabled' || ability.state === 'ability__button--speed-active'
                        ? 'ability-button__name--disabled'
                        : ''
                }`}>
                {ability.name.toUpperCase()}
            </h3>
        </div>
    );
};

export default AbilityButton;
