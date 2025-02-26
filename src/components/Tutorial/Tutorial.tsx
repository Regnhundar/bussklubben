import './tutorial.css';
import useGameStore from '../../stores/gameStore';
import ConfirmationButton from '../ConfirmationButton/ConfirmationButton';
import MessageOverlay from '../MessageOverlay/MessageOverlay';
import { useState } from 'react';
const Tutorial: React.FC = () => {
    const { setIsTutorial } = useGameStore();
    const [slideNumber, setSlideNumber] = useState(0);

    const tutorialMessages = [
        ['Det här är spelbrädet.'],
        ['Bakom rutorna finns en bit väg...'],
        ['Byt plats på bitarna...'],
        ['Vägen ska gå från start till mål.'],
        ['Det finns knappar längst ned...'],
    ];

    return (
        <div className='tutorial'>
            <MessageOverlay textLines={tutorialMessages[slideNumber]} />
            <button
                className={`tutorial__previous-slide-button`}
                onClick={() => setSlideNumber((prev) => (prev === 0 ? tutorialMessages.length - 1 : prev - 1))}>
                <img
                    src='/images/icons/chevron.svg'
                    alt='Pil åt vänster'
                    className='tutorial__chevron tutorial__chevron--left'
                />
            </button>
            <button
                className={`tutorial__previous-slide-button tutorial__previous-slide-button--right`}
                onClick={() => setSlideNumber((prev) => (prev === tutorialMessages.length - 1 ? 0 : prev + 1))}>
                <img
                    src='/images/icons/chevron.svg'
                    alt='Pil åt höger'
                    className='tutorial__chevron tutorial__chevron--right'
                />
            </button>
            <ConfirmationButton type={'proceed'} textContent='SPELA' onClick={() => setIsTutorial(false)} />
        </div>
    );
};

export default Tutorial;
