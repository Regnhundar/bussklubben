import { useState } from 'react';
import './confirmationButton.css';

interface Props {
    onClick: () => void;
    textContent?: string;
    icon?: Icon;
    type?: 'proceed' | 'cancel' | 'attention';
    extraClass?: string;
}
interface Icon {
    src: string;
    alt: string;
}

const ConfirmationButton: React.FC<Props> = ({ onClick, textContent, type = 'proceed', extraClass, icon }) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const handleFunction = () => {
        setIsPressed(true);
        setTimeout(() => {
            onClick();
            setIsPressed(false);
        }, 200);
    };
    return (
        <button
            className={
                isPressed
                    ? `confirmation-button confirmation-button--${type} confirmation-button--pressed ${
                          extraClass ? extraClass : ''
                      }`
                    : `confirmation-button confirmation-button--${type} ${extraClass ? extraClass : ''}`
            }
            onClick={handleFunction}
            disabled={isPressed}>
            {textContent ? (
                textContent
            ) : icon ? (
                <img className='confirmation-button__icon' src={icon.src} alt={icon.alt} />
            ) : (
                ''
            )}
        </button>
    );
};

export default ConfirmationButton;
