import './abilityBar.css';
import AbilityButton from '../AbilityButton/AbilityButton';
import { Ability } from '../../interfaces/ability';
import useGameBoardStore from '../../stores/gameBoardStore';
import { jokerRoadTiles } from '../../data/roadTiles';
import { useCallback, useEffect } from 'react';
import useGameStore from '../../stores/gameStore';
import { motion } from 'motion/react';
import { abilityBarVariant } from '../../motionVariants/variants';

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
        isExiting,
        startingIndex,
        startConnectionIndex,
        endingIndex,
        finishConnectionIndex,
        gameBoardArray,
    } = useGameBoardStore();
    const { isGameOverConfirmation, isGameOver, isPreparationTime, setIsPreparationTime } = useGameStore();
    const isFinalSquareLinked = useCallback(() => {
        if (endingIndex === null || finishConnectionIndex === null) return false;
        const endingTileData = gameBoardArray[endingIndex];
        return (
            endingTileData.isRevealed &&
            endingTileData.isLinkedToStart &&
            endingTileData.tile.connections[finishConnectionIndex] === true
        );
    }, [endingIndex, finishConnectionIndex, gameBoardArray]);

    const isFirstSquareLinked = useCallback(() => {
        if (startingIndex === null || startConnectionIndex === null) return false;
        const startTileData = gameBoardArray[startingIndex];
        return (
            startTileData.isRevealed &&
            startTileData.isLinkedToStart &&
            startTileData.tile.connections[startConnectionIndex] === true
        );
    }, [startingIndex, startConnectionIndex, gameBoardArray]);

    const bytState = jokerTile
        ? 'ability__button--joker-active'
        : isPreparationTime || isGameOver || isExiting
        ? 'ability__button--disabled'
        : '';
    const lugnState =
        squareSpeed === 'slow'
            ? 'ability__button--speed-active'
            : squareSpeed === 'turbo' || isPreparationTime || isGameOver || isExiting
            ? 'ability__button--disabled'
            : '';
    const turboState =
        squareSpeed === 'turbo' && !isExiting
            ? 'ability__button--speed-active'
            : squareSpeed === 'slow' ||
              isGameOver ||
              isExiting ||
              (squareSpeed === 'normal' && !isFirstSquareLinked() && isPreparationTime)
            ? 'ability__button--disabled'
            : squareSpeed === 'normal' && isFinalSquareLinked()
            ? 'ability__button--turbo-suggestion'
            : '';

    // Skiftar vilken "byt/jokerTile" som visas i ability bar.
    useEffect(() => {
        if (!isGameOver && !isPreparationTime && !jokerTile && !isGameOverConfirmation) {
            const interval = setInterval(() => {
                if (activeJokerTile === jokerRoadTiles.length - 1 && !isGameOver) {
                    setActiveJokerTile(0);
                } else {
                    setActiveJokerTile((prev) => prev + 1);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
        if (isPreparationTime || isGameOverConfirmation) {
            setActiveJokerTile(0);
        }
    }, [activeJokerTile, isPreparationTime, isGameOver, jokerTile, isGameOverConfirmation]);

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
        if (!isGameOver && !isPreparationTime) {
            if (squareSpeed === 'normal') {
                setSquareSpeed('turbo');
            }
        }
        if (isPreparationTime) {
            if (isFinalSquareLinked()) {
                setIsPreparationTime(false);
                setSquareSpeed('turbo');
                return;
            }
        }
        if (isFirstSquareLinked()) {
            setIsPreparationTime(false);
        }
    };
    const abilities: Ability[] = [
        {
            name: 'byt',
            class: 'byt',
            alt: 'Vägbit som du kan byta till.',
            src:
                !isExiting && !isGameOver && !isPreparationTime
                    ? jokerRoadTiles[activeJokerTile].src
                    : jokerRoadTiles[0].src,
            state: bytState,
            func: handleJokerTile,
        },
        {
            name: 'sakta',
            class: 'lugn',
            alt: 'En snigel.Bussen förvandlas till en långsam snigel.',
            src: `${import.meta.env.BASE_URL}images/abilities/paus.svg`,
            state: lugnState,
            func: handleSlowBus,
        },
        {
            name: isPreparationTime ? 'kör' : 'snabbt',
            class: 'turbo',
            alt: 'Buss som kör fort. Bussen åker snabbare.',
            src:
                (isFinalSquareLinked() && isPreparationTime) || !isPreparationTime
                    ? `${import.meta.env.BASE_URL}images/abilities/flash.svg`
                    : `${import.meta.env.BASE_URL}images/abilities/play.svg`,
            state: turboState,
            func: handleTurboBus,
        },
    ];
    return (
        <motion.div variants={abilityBarVariant} initial='hidden' animate='show' exit='hidden' className='ability-bar'>
            {abilities.map((ability) => (
                <AbilityButton key={ability.name} ability={ability} />
            ))}
        </motion.div>
    );
};

export default AbilityBar;
