import { useState } from 'react';
import './ctaButton.css';
interface Props {
    text: string;
    onClick: () => void;
    modifier: 'proceed' | 'cancel' | 'info';
    attention?: boolean;
}
const CTAbutton: React.FC<Props> = ({ text, onClick, modifier, attention = false }) => {
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const animateThenExecute = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        setTimeout(() => {
            setIsAnimating(false);

            onClick();
        }, 250);
    };

    return (
        <button
            disabled={isAnimating}
            onClick={animateThenExecute}
            className={`cta-button cta-button--${modifier} ${
                isAnimating ? 'cta-button--clicked' : attention ? 'cta-button--look-at-me' : ''
            }`}>
            <span className='cta-button__button-text'>{text.toUpperCase()}</span>
        </button>
    );
};

export default CTAbutton;
