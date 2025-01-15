import './abilityBar.css';
import AbilityButton from '../AbilityButton/AbilityButton';
import { Ability } from '../../interfaces/ability';

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
        func: () => console.log('Du klickade på LUGN'),
    },
    {
        name: 'turbo',
        alt: 'Buss som kör fort. Bussen åker snabbare.',
        src: './images/abilities/turbo.svg',
        func: () => console.log('Du klickade på TURBO'),
    },
];

const AbilityBar: React.FC = () => {
    return (
        <div className='ability-bar'>
            {abilities.map((ability) => (
                <AbilityButton key={ability.name} ability={ability} />
            ))}
        </div>
    );
};

export default AbilityBar;
