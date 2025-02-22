import { useEffect, useState } from 'react';
import './startEndIndicator.css';

interface Props {
    type: 'start' | 'finish';
    direction: 'up' | 'down' | 'left' | 'right';
    isRevealed: boolean;
    isConnected?: boolean;
    isActive?: boolean;
    isPrevious?: boolean;
}
const StartEndIndicator: React.FC<Props> = ({
    type = 'start',
    direction = 'down',
    isRevealed = false,
    isConnected,
    isActive = false,
    isPrevious = false,
}) => {
    const [animationStage, setAnimationStage] = useState('initial');

    useEffect(() => {
        const animationTimeout = setTimeout(() => setAnimationStage('repeat'), 100);
        return () => clearTimeout(animationTimeout);
    }, []);

    return isRevealed ? (
        <figure className={`start-and-end start-and-end--${direction}`}>
            <img
                className={`start-and-end__arch start-and-end__arch--${type}`}
                src={type === 'start' ? './images/tunnel-green.svg' : './images/tunnel-yellow.svg'}
            />
            {!isConnected && !isActive && !isPrevious && (
                <>
                    <span
                        className={`start-and-end__arrow start-and-end__arrow--${type} 
                }`}
                    />
                    <span className={`start-and-end__arrow start-and-end__arrow--${type}`} />
                </>
            )}
        </figure>
    ) : (
        <figure
            className={`indicator-sign indicator-sign--${direction} ${
                animationStage === 'initial' ? 'indicator-sign--initial' : `indicator-sign--${direction}-animation`
            } ${type === 'start' ? 'indicator-sign--green' : 'indicator-sign--yellow'}`}>
            {type === 'start' ? 'START' : 'MÅL'}
        </figure>
    );
};

export default StartEndIndicator;
