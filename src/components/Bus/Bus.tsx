import useGameBoardStore from '../../stores/gameBoardStore';
import useGameStore from '../../stores/gameStore';
import { motion } from 'motion/react';
import './bus.css';
const Bus: React.FC = () => {
    const { isPreparationTime } = useGameStore();
    const { squareSpeed } = useGameBoardStore();

    const handleStateInfo = () => {
        switch (squareSpeed) {
            case 'turbo':
                return { src: './images/bus.svg', alt: 'En gul buss med gröna dekaler som åker som en oljad blixt!' };
            case 'slow':
                return {
                    src: './images/bus.svg',
                    alt: 'En gul buss som fördvandlats till en gul snigel med grönt skal som sniglar sig fram riktigt långsamt.',
                };
            default:
                return { src: './images/bus.svg', alt: 'En gul buss med gröna dekaler som åker mot sin hållplats.' };
        }
    };
    return (
        !isPreparationTime && (
            <motion.img
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
