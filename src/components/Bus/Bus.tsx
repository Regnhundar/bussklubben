import useGameBoardStore from '../../stores/gameBoardStore';
import useGameStore from '../../stores/gameStore';
import { motion } from 'motion/react';
import './bus.css';
import { determineDirection } from '../../utils/utilityFunctions';
import { useEffect, useState } from 'react';
import { SLOW_MULTIPLIER, SQUARE_TIMER, TURBO_MULTIPLIER } from '../../constants';
const Bus: React.FC = () => {
    const { isPreparationTime } = useGameStore();
    const { squareSpeed, nextSquareToCheckIndex, arrivalIndex } = useGameBoardStore();
    const [busDirection, setBusDirection] = useState<string | null>(null);

    const handleStateInfo = () => {
        switch (squareSpeed) {
            case 'turbo':
                return {
                    src: busDirection === 'left' ? './images/bus-left.svg' : './images/bus-right.svg',
                    alt: 'En gul buss med gröna dekaler som åker som en oljad blixt!',
                };
            case 'slow':
                return {
                    src: './images/abilities/paus.svg',
                    alt: 'En gul buss som förvandlats till en gul snigel med grönt skal som sniglar sig fram riktigt långsamt.',
                };
            default:
                return {
                    src: busDirection === 'left' ? './images/bus-left.svg' : './images/bus-right.svg',
                    alt: 'En gul buss med gröna dekaler som åker mot sin hållplats.',
                };
        }
    };
    useEffect(() => {
        if (nextSquareToCheckIndex !== null && arrivalIndex !== null) {
            const direction = determineDirection(nextSquareToCheckIndex, arrivalIndex);
            const willLeaveFrom =
                direction === 0
                    ? 'up'
                    : direction === 2
                    ? 'down'
                    : direction === 1
                    ? 'right'
                    : direction === 3
                    ? 'left'
                    : null;
            if (willLeaveFrom !== null) {
                setBusDirection(willLeaveFrom);
            }
        }
    }, [nextSquareToCheckIndex]);
    useEffect(() => {
        if (busDirection !== null) {
            console.log('busDirection', busDirection);
        }
    }, [busDirection]);
    //Höger till vänster = bra. Vänster till höger fuckar ur.
    const busLeaveRotationLeft =
        busDirection === 'down' ? { rotate: -90 } : busDirection === 'up' ? { rotate: 90 } : { rotate: 0 };
    const busLeaveRotationRight =
        busDirection === 'down' ? { rotate: 90 } : busDirection === 'up' ? { rotate: -90 } : { rotate: 0 };

    return (
        !isPreparationTime && (
            <motion.img
                initial={busDirection === 'right' ? busLeaveRotationRight : busLeaveRotationLeft}
                animate={busDirection === 'right' ? busLeaveRotationRight : busLeaveRotationLeft}
                exit={busDirection === 'right' ? busLeaveRotationRight : busLeaveRotationLeft}
                // initial={busLeaveRotationRight}
                // animate={busLeaveRotationRight}
                // exit={busLeaveRotationRight}
                transition={{
                    duration:
                        squareSpeed === 'turbo'
                            ? (TURBO_MULTIPLIER * SQUARE_TIMER) / 2
                            : squareSpeed === 'slow'
                            ? (SLOW_MULTIPLIER * SQUARE_TIMER) / 2
                            : SQUARE_TIMER / 2,
                    ease: 'linear',
                    delay: 0.05,
                }}
                layout='position'
                layoutId='bus'
                className={`bus`}
                src={handleStateInfo().src}
                alt={handleStateInfo().alt}
            />
        )
    );
};

export default Bus;
