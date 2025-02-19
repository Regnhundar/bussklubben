import { useState } from 'react';
import './messageOverlay.css';
import useGameStore from '../../stores/gameStore';
const MessageOverlay: React.FC = () => {
    const { setIsGameOver } = useGameStore();
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const handleConfirmation = () => {
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
            setIsGameOver(true);
        }, 400);
    };

    return (
        <article className='toast-message'>
            <div className='toast-message__message-wrapper'>
                <h2 className='toast-message__title'>Åh nej!</h2>
                <h3 className='toast-message__subtitle'>Tiden tog slut!</h3>
            </div>
            <figure className='toast-message__image-wrapper'>
                <img
                    src='../../../public/images/busdriver-head.png'
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
        </article>
    );
};

export default MessageOverlay;
