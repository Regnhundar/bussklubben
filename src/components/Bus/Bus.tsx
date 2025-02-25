import useGameBoardStore from '../../stores/gameBoardStore';
import useGameStore from '../../stores/gameStore';
import { motion } from 'motion/react';
import './bus.css';
import { SLOW_MULTIPLIER, SQUARE_TIMER, TURBO_MULTIPLIER } from '../../constants';
import { useMemo } from 'react';
interface Props {
    x: number;
    y: number;

    upOrDown: 'up' | 'down' | string;
    leftOrRight: 'left' | 'right' | string;
    direction: 'horizontal' | 'vertical' | string;
    squareSize: number;
}

const Bus: React.FC<Props> = ({ x, y, upOrDown, leftOrRight, direction, squareSize }) => {
    const { isPreparationTime } = useGameStore();
    const { squareSpeed, startingIndex, arrivalIndex, nextSquareToCheckIndex, gameBoardArray, isExiting } =
        useGameBoardStore();

    const firstSquareEntrance = useMemo(() => {
        return (
            nextSquareToCheckIndex !== null &&
            arrivalIndex !== null &&
            nextSquareToCheckIndex === startingIndex &&
            gameBoardArray[nextSquareToCheckIndex].tile.connections[arrivalIndex] === true
        );
    }, [nextSquareToCheckIndex, arrivalIndex, startingIndex]);

    const imageWidth = squareSize * 0.9;
    const imageHeight = (37 / 93) * imageWidth; // 37/93 är aspect ratio.
    const offsetX = (squareSize - imageWidth) / 2;
    const offsetY = (squareSize - imageHeight) / 2;

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
                    src: './images/bus-turbo.svg',
                    alt: 'En gul buss med gröna dekaler som åker som en oljad blixt!',
                };
            case 'slow':
                return {
                    src: './images/bus-slow.svg',
                    alt: 'En gul buss som förvandlats till en gul snigel med grönt skal som sniglar sig fram riktigt långsamt.',
                };
            default:
                return {
                    src: './images/bus.svg',
                    alt: 'En gul buss med gröna dekaler som åker mot sin hållplats.',
                };
        }
    };

    const horizontalVariant = {
        hidden: {
            rotateY: leftOrRight === 'right' ? 0 : 180,
            rotateZ: 0,
            left: firstSquareEntrance ? x + (leftOrRight === 'right' ? -imageWidth : imageWidth) : x + offsetX,
            top: y + offsetY,
        },
        show: {
            rotateY: leftOrRight === 'right' ? 0 : 180,
            rotateZ: 0,
            left: isExiting ? x + offsetX + (leftOrRight === 'right' ? imageWidth : -imageWidth) : x + offsetX,
            top: y + offsetY,
        },
    };

    const verticalVariant = {
        hidden: {
            rotateY: leftOrRight === 'right' ? 0 : 180,
            rotateZ: upOrDown === 'up' ? 90 : -90,
            left: x + offsetX,
            top: firstSquareEntrance ? y + offsetY + (upOrDown === 'up' ? -imageWidth : imageWidth) : y + offsetY,
        },
        show: {
            rotateY: leftOrRight === 'right' ? 0 : 180,
            rotateZ: upOrDown === 'up' ? 90 : -90,
            left: x + offsetX,
            top: isExiting ? y + offsetY + (upOrDown === 'up' ? imageWidth : -imageWidth) : y + offsetY,
        },
    };

    return (
        !isPreparationTime && (
            <motion.img
                variants={direction === 'horizontal' ? horizontalVariant : verticalVariant}
                initial='hidden'
                animate='show'
                transition={{
                    duration: squareSpeed !== 'turbo' ? animationSpeed / 2 : animationSpeed,
                    ease: squareSpeed === 'turbo' ? 'linear' : [0.9, -0.55, 0.27, 1.55],
                }}
                className={`bus`}
                src={handleStateInfo().src}
                alt={handleStateInfo().alt}
                style={{ maxWidth: imageWidth }}
            />
        )
    );
};

export default Bus;
