import './abilityBar.css';
import AbilityButton from '../AbilityButton/AbilityButton';
import { Ability } from '../../interfaces/ability';
import useGameBoardStore from '../../stores/gameBoardStore';
import { SLOW_MULTIPLIER, TURBO_MULTIPLIER } from '../../constants';

const AbilityBar: React.FC = () => {
    const { activateSpeedAbility } = useGameBoardStore();

    const abilities: Ability[] = [
        {
            name: 'byt',
            alt: 'Vägbit som du kan byta till.',
            src: './images/roadTiles/vertical.svg',
            func: () => console.log('Du klickade på BYT'),
        },
        {
            name: 'lugn',
            alt: 'Paus ikon. Bussen saktar in.',
            src: './images/abilities/paus.svg',
            func: () => activateSpeedAbility(SLOW_MULTIPLIER),
        },
        {
            name: 'turbo',
            alt: 'Buss som kör fort. Bussen åker snabbare.',
            src: './images/abilities/turbo.svg',
            func: () => activateSpeedAbility(TURBO_MULTIPLIER),
        },
    ];
    return (
        <div className='ability-bar'>
            {abilities.map((ability) => (
                <AbilityButton key={ability.name} ability={ability} />
            ))}
        </div>
    );
};

export default AbilityBar;
