import { motion } from "motion/react";
import useGameStore from "../../stores/gameStore";
import JumbotronInfoField from "../JumbotronInfoField/JumbotronInfoField";
import LevelIndicator from "../LevelIndicator/LevelIndicator";
import "./jumbotron.css";
import { jumbotronVariant } from "../../motionVariants/variants";
import { useShallow } from "zustand/react/shallow";

const Jumbotron: React.FC = () => {
    const { totalTime, points, isPreparationTime, preparationTime, level } = useGameStore(
        useShallow((state) => ({
            totalTime: state.totalTime,
            points: state.points,
            isPreparationTime: state.isPreparationTime,
            preparationTime: state.preparationTime,
            level: state.level,
        }))
    );

    return (
        <motion.section variants={jumbotronVariant} initial="hidden" animate="show" exit="hidden" className="jumbotron">
            {isPreparationTime ? (
                <LevelIndicator
                    key="preparation"
                    message="AVGÅNG OM"
                    infoNumber={preparationTime}
                    modifier="preparing"
                    type="departure"
                />
            ) : (
                <LevelIndicator
                    key="running"
                    message="HÅLLPLATS"
                    infoNumber={level}
                    modifier="running"
                    type="bus-stop"
                />
            )}

            <JumbotronInfoField
                variable={totalTime}
                unit={"SEKUNDER"}
                src={`${import.meta.env.BASE_URL}images/icons/hour-glass.svg`}
                type="timer"
            />
            <JumbotronInfoField
                variable={points}
                unit={"POÄNG"}
                src={`${import.meta.env.BASE_URL}images/icons/star.svg`}
                type={"points"}
            />
        </motion.section>
    );
};

export default Jumbotron;
