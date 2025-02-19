import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import './messageOverlay.css';
import useGameStore from '../../stores/gameStore';
import { jumbotronVariant } from '../../motionVariants/variants';
import useGameBoardStore from '../../stores/gameBoardStore';
const MessageOverlay: React.FC = () => {
    const { setIsGameOver, setIsGameOverConfirmation, points, totalTime } = useGameStore();
    const { setStartingIndex, setEndingIndex, startingIndex, startConnectionIndex, gameBoardArray } =
        useGameBoardStore();
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const isFirstSquareConnected =
        startingIndex !== null &&
        startConnectionIndex !== null &&
        gameBoardArray[startingIndex].isRevealed === true &&
        gameBoardArray[startingIndex].tile.connections[startConnectionIndex] === true;

    const handleConfirmation = () => {
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
            setIsGameOver(true);
            setStartingIndex(null);
            setEndingIndex(null);
            setIsGameOverConfirmation(false);
            window.ClubHouseGame.setScore(points);
            window.ClubHouseGame.gameDone();
        }, 400);
    };

    const handleMessage = () => {
        if (totalTime === 0) {
            return 'Tiden tog slut!';
        }
        if (!isFirstSquareConnected) {
            return 'Start felkopplad!';
        }
        return 'Där var vägen slut!';
    };
    return (
        <motion.article
            variants={jumbotronVariant}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='toast-message'>
            <div className='toast-message__message-wrapper'>
                <h2 className='toast-message__title'>Åh nej...</h2>
                <h3 className='toast-message__subtitle'>{handleMessage()}</h3>
            </div>
            <figure className='toast-message__image-wrapper'>
                <img
                    src='/images/busdriver-head.png'
                    alt='En busschafför med mustasch och hatt.'
                    className='toast-message__driver-image'
                />
            </figure>
            <button
                className={
                    isPressed
                        ? 'toast-message__confirmation-button toast-message__confirmation-button--pressed'
                        : 'toast-message__confirmation-button'
                }
                onClick={handleConfirmation}
                disabled={isPressed ? true : false}>
                OK
            </button>
        </motion.article>
    );
};

export default MessageOverlay;
