import useGameStore from "../../stores/gameStore";
import { motion } from "motion/react";
import "./levelIndicator.css";
import { levelIndicatorVariant } from "../../motionVariants/variants";
interface Props {
    message: string;
    infoNumber: number;
    modifier: string;
    type: "departure" | "bus-stop";
}
const LevelIndicator: React.FC<Props> = ({ message, infoNumber, modifier, type }) => {
    const preparationTime = useGameStore((state) => state.preparationTime);

    const typeClass = type === "departure" && preparationTime <= 5 ? "level-info--soon-to-leave" : "";
    return (
        <motion.article
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={levelIndicatorVariant}
            className={`level-info ${typeClass}`}>
            <h1 className={`level-info__message level-info__message--${modifier}`}>{message}</h1>
            <h2 className={`level-info__number level-info__number--${modifier}`}>{infoNumber}</h2>
        </motion.article>
    );
};

export default LevelIndicator;
