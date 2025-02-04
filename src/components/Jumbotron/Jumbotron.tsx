import { AnimatePresence, motion } from 'motion/react';
import useGameStore from '../../stores/gameStore';
import JumbotronInfoField from '../JumbotronInfoField/JumbotronInfoField';
import LevelIndicator from '../LevelIndicator/LevelIndicator';
import './jumbotron.css';
import { jumbotronVariant } from '../../motionVariants/variants';

const Jumbotron: React.FC = () => {
    const { totalTime, points, isPreparationTime, preparationTime, level } = useGameStore();

    return (
        <motion.section variants={jumbotronVariant} initial='hidden' animate='show' exit='hidden' className='jumbotron'>
            <AnimatePresence>
                {isPreparationTime ? (
                    <LevelIndicator
                        key='preparation'
                        message='AVGÅNG OM'
                        infoNumber={preparationTime}
                        modifier='preparing'
                        type='departure'
                    />
                ) : (
                    <LevelIndicator
                        key='running'
                        message='HÅLLPLATS'
                        infoNumber={level}
                        modifier='running'
                        type='bus-stop'
                    />
                )}
            </AnimatePresence>
            <JumbotronInfoField
                variable={totalTime}
                unit={'SEKUNDER'}
                src={`${import.meta.env.BASE_URL}images/icons/hour-glass.svg`}
                type='timer'
            />
            <JumbotronInfoField
                variable={points}
                unit={'POÄNG'}
                src={`${import.meta.env.BASE_URL}images/icons/star.svg`}
                type={'points'}
            />
        </motion.section>
    );
};

export default Jumbotron;
