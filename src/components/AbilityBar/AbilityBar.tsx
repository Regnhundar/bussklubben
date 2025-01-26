import './abilityBar.css';
import AbilityButton from '../AbilityButton/AbilityButton';
import { Ability } from '../../interfaces/ability';
import useGameBoardStore from '../../stores/gameBoardStore';
import { roadTiles } from '../../data/roadTiles';
import { useEffect, useState } from 'react';
import useGameStore from '../../stores/gameStore';

const AbilityBar: React.FC = () => {
    const { squareSpeed, setSquareSpeed, jokerTile, setJokerTile, squaresToSwap, setSquaresToSwap } =
        useGameBoardStore();
    const { isGameOver, isPreparationTime, setIsPreparationTime } = useGameStore();
    const [activeTile, setActiveTile] = useState(0);

    const newTiles = [...roadTiles].filter((tile) => tile.name !== 'stop');

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
                if (activeTile === newTiles.length - 1 && !isGameOver) {
                    setActiveTile(0);
                } else {
                    setActiveTile((prev) => prev + 1);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [activeTile, isPreparationTime, isGameOver, jokerTile]);

    const handleJokerTile = () => {
        if (!isPreparationTime) {
            if (squaresToSwap.length !== 0) {
                setSquaresToSwap();
            }
            if (jokerTile) {
                setJokerTile(null);
                return;
            }

            setJokerTile(newTiles[activeTile]);
        }
    };
    const abilities: Ability[] = [
        {
            name: 'byt',
            alt: 'Vägbit som du kan byta till.',
            src: !isGameOver && !isPreparationTime ? newTiles[activeTile].src : newTiles[0].src,
            state: bytState,
            func: () => handleJokerTile(),
        },
        {
            name: 'lugn',
            alt: 'Paus ikon. Bussen saktar in.',
            src: './images/abilities/paus.svg',
            state: lugnState,
            func: () => squareSpeed === 'normal' && setSquareSpeed('slow'),
        },
        {
            name: 'turbo',
            alt: 'Buss som kör fort. Bussen åker snabbare.',
            src: './images/abilities/turbo.svg',
            state: turboState,
            func: () => {
                if (squareSpeed === 'normal') {
                    setSquareSpeed('turbo');
                    isPreparationTime && setIsPreparationTime(false);
                }
            },
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
