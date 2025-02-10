import useGameBoardStore from '../../stores/gameBoardStore';
import useGameStore from '../../stores/gameStore';
import { motion } from 'motion/react';
import './bus.css';

import { useState } from 'react';
import { SLOW_MULTIPLIER, SQUARE_TIMER, TURBO_MULTIPLIER } from '../../constants';

interface Props {
    x: number;
    y: number;
}

const Bus: React.FC<Props> = ({ x, y }) => {
    const { isPreparationTime } = useGameStore();
    const { squareSpeed } = useGameBoardStore();
    const [busDirection, setBusDirection] = useState<string | null>(null);

    const animationSpeed =
        squareSpeed === 'turbo'
            ? SQUARE_TIMER * TURBO_MULTIPLIER
            : squareSpeed === 'slow'
            ? SQUARE_TIMER * SLOW_MULTIPLIER
            : SQUARE_TIMER;

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

    return (
        !isPreparationTime && (
            <motion.img
                initial={{ opacity: 0, left: x, top: y }}
                animate={{ opacity: 1, left: x, top: y }}
                exit={{ opacity: 0, left: x, top: y }}
                transition={{ duration: animationSpeed }}
                className={`bus`}
                src={handleStateInfo().src}
                alt={handleStateInfo().alt}
            />
        )
    );
};

export default Bus;
