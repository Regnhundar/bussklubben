import useGameBoardStore from '../../stores/gameBoardStore';
import useGameStore from '../../stores/gameStore';
import { motion } from 'motion/react';
import './bus.css';
import { determineDirection } from '../../utils/utilityFunctions';
import { useEffect, useState } from 'react';
const Bus: React.FC = () => {
    const { isPreparationTime } = useGameStore();
    const { squareSpeed, nextSquareToCheckIndex, arrivalIndex } = useGameBoardStore();
    const [busDirection, setBusDirection] = useState<string>('left');

    const handleStateInfo = () => {
        switch (squareSpeed) {
            case 'turbo':
                return { src: './images/bus.svg', alt: 'En gul buss med gröna dekaler som åker som en oljad blixt!' };
            case 'slow':
                return {
                    src: './images/abilities/paus.svg',
                    alt: 'En gul buss som förvandlats till en gul snigel med grönt skal som sniglar sig fram riktigt långsamt.',
                };
            default:
                return { src: './images/bus.svg', alt: 'En gul buss med gröna dekaler som åker mot sin hållplats.' };
        }
    };
    useEffect(() => {
        if (nextSquareToCheckIndex !== null && arrivalIndex !== null) {
            const direction = determineDirection(nextSquareToCheckIndex, arrivalIndex);
            const willLeaveFrom =
                direction === 0 ? 'up' : direction === 2 ? 'down' : direction === 1 ? 'right' : 'left';

            setBusDirection(willLeaveFrom);
        }
    }, [nextSquareToCheckIndex, arrivalIndex]);

    const busLeaveRotation =
        busDirection === 'down'
            ? { rotate: -90, rotateY: 0 }
            : busDirection === 'up'
            ? { rotate: 90, rotateY: 0 }
            : busDirection === 'right'
            ? { rotate: 0, rotateY: 180 }
            : { rotate: 0, rotateY: 0 };

    return (
        !isPreparationTime && (
            <motion.img
                initial={busLeaveRotation}
                animate={busLeaveRotation}
                exit={busLeaveRotation}
                transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.05 }}
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
