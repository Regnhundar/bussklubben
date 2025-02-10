import useGameBoardStore from '../../stores/gameBoardStore';
import useGameStore from '../../stores/gameStore';
import { motion } from 'motion/react';
import './bus.css';
import { SLOW_MULTIPLIER, SQUARE_TIMER, TURBO_MULTIPLIER } from '../../constants';

interface Props {
    x: number;
    y: number;
    upOrDown: string | null;
    leftOrRight: string | null;
    direction: string | null;
}

const Bus: React.FC<Props> = ({ x, y, upOrDown, leftOrRight, direction }) => {
    const { isPreparationTime } = useGameStore();
    const { squareSpeed } = useGameBoardStore();

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
                    src: './images/bus-right.svg',
                    alt: 'En gul buss med gröna dekaler som åker som en oljad blixt!',
                };
            case 'slow':
                return {
                    src: './images/abilities/paus.svg',
                    alt: 'En gul buss som förvandlats till en gul snigel med grönt skal som sniglar sig fram riktigt långsamt.',
                };
            default:
                return {
                    src: './images/bus-right.svg',
                    alt: 'En gul buss med gröna dekaler som åker mot sin hållplats.',
                };
        }
    };

    const leftVariant = {
        hidden: { opacity: 0, left: x, top: y, scaleX: -1, rotate: 0 },
        show: { opacity: 1, left: x, top: y, scaleX: -1, rotate: 0 },
    };
    const rightVariant = {
        hidden: { opacity: 0, left: x, top: y, scaleX: 1, rotate: 0 },
        show: { opacity: 1, left: x, top: y, scaleX: 1, rotate: 0 },
    };
    const downVariant = {
        hidden: {
            opacity: 0,
            left: x,
            top: y,
            scaleX: leftOrRight === 'right' ? 1 : -1,
            rotate: -90,
        },
        show: {
            opacity: 1,
            left: x,
            top: y,
            scaleX: leftOrRight === 'right' ? 1 : -1,
            rotate: -90,
        },
    };
    const upVariant = {
        hidden: {
            opacity: 0,
            left: x,
            top: y,
            scaleX: leftOrRight === 'right' ? 1 : -1,
            rotate: 90,
        },
        show: {
            opacity: 1,
            left: x,
            top: y,
            scaleX: leftOrRight === 'right' ? 1 : -1,
            rotate: 90,
        },
    };

    const horizontalAnimation = leftOrRight === 'left' ? leftVariant : rightVariant;
    const verticalAnimation = upOrDown === 'up' ? upVariant : downVariant;

    return (
        !isPreparationTime && (
            <motion.img
                initial={direction === 'horizontal' ? horizontalAnimation.hidden : verticalAnimation.hidden}
                animate={direction === 'horizontal' ? horizontalAnimation.show : verticalAnimation.show}
                exit={direction === 'horizontal' ? horizontalAnimation.hidden : verticalAnimation.hidden}
                transition={{ duration: animationSpeed, ease: 'linear' }}
                className={`bus`}
                src={handleStateInfo().src}
                alt={handleStateInfo().alt}
            />
        )
    );
};

export default Bus;
