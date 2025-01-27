import './abilityBar.css';
import AbilityButton from '../AbilityButton/AbilityButton';
import { Ability } from '../../interfaces/ability';
import useGameBoardStore from '../../stores/gameBoardStore';
import { jokerRoadTiles } from '../../data/roadTiles';
import { useEffect } from 'react';
import useGameStore from '../../stores/gameStore';

const AbilityBar: React.FC = () => {
    const {
        squareSpeed,
        setSquareSpeed,
        jokerTile,
        setJokerTile,
        activeJokerTile,
        setActiveJokerTile,
        squaresToSwap,
        setSquaresToSwap,
    } = useGameBoardStore();
    const { isGameOver, isPreparationTime, setIsPreparationTime } = useGameStore();

    const bytState = jokerTile ? 'ability__button--joker-active' : '';
    const lugnState =
        squareSpeed === 'slow'
            ? 'ability__button--speed-active'
            : squareSpeed === 'turbo'
            ? 'ability__button--speed-disabled'
            : '';
    const turboState =
        squareSpeed === 'turbo'
            ? 'ability__button--speed-active'
            : squareSpeed === 'slow'
            ? 'ability__button--speed-disabled'
            : '';

    useEffect(() => {
        if (!isGameOver && !isPreparationTime && !jokerTile) {
            const interval = setInterval(() => {
                if (activeJokerTile === jokerRoadTiles.length - 1 && !isGameOver) {
                    setActiveJokerTile(0);
                } else {
                    setActiveJokerTile((prev) => prev + 1);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [activeJokerTile, isPreparationTime, isGameOver, jokerTile]);

    const handleJokerTile = () => {
        if (!isPreparationTime && !isGameOver) {
            if (squaresToSwap.length !== 0) {
                setSquaresToSwap();
            }
            if (jokerTile) {
                setJokerTile(null);
                return;
            }
            setJokerTile(jokerRoadTiles[activeJokerTile]);
        }
    };

    const handleSlowBus = () => {
        if (!isPreparationTime && !isGameOver) {
            if (squareSpeed === 'normal') {
                setSquareSpeed('slow');
            }
        }
    };
    const handleTurboBus = () => {
        if (!isGameOver) {
            if (squareSpeed === 'normal') {
                setSquareSpeed('turbo');
            }
            if (isPreparationTime) {
                setIsPreparationTime(false);
            }
        }
    };
    const abilities: Ability[] = [
        {
            name: 'byt',
            alt: 'Vägbit som du kan byta till.',
            src: !isGameOver && !isPreparationTime ? jokerRoadTiles[activeJokerTile].src : jokerRoadTiles[0].src,
            state: bytState,
            func: handleJokerTile,
        },
        {
            name: 'lugn',
            alt: 'Paus ikon. Bussen saktar in.',
            src: './images/abilities/paus.svg',
            state: lugnState,
            func: handleSlowBus,
        },
        {
            name: 'turbo',
            alt: 'Buss som kör fort. Bussen åker snabbare.',
            src: './images/abilities/turbo.svg',
            state: turboState,
            func: handleTurboBus,
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
