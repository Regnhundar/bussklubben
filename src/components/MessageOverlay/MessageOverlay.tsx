import { motion } from 'motion/react';
import './messageOverlay.css';
import { jumbotronVariant } from '../../motionVariants/variants';
import ConfirmationButton from '../ConfirmationButton/ConfirmationButton';

interface Props {
    textLines: string[];
    onClick?: () => void;
}
const MessageOverlay: React.FC<Props> = ({ textLines, onClick }) => {
    return (
        <motion.article
            variants={jumbotronVariant}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='toast-message'>
            <div className='toast-message__message-wrapper'>
                {textLines.map((line, i) => (
                    <h2 key={i} className='toast-message__text'>
                        {line}
                    </h2>
                ))}
            </div>
            <figure className='toast-message__image-wrapper'>
                <img
                    src='/images/busdriver-head.png'
                    alt='En busschafför med mustasch och hatt.'
                    className='toast-message__driver-image'
                />
            </figure>
            {onClick && <ConfirmationButton textContent='OK' onClick={onClick} />}
        </motion.article>
    );
};

export default MessageOverlay;
