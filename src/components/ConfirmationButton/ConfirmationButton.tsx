import { useState } from 'react';
import './confirmationButton.css';
interface Props {
    onClick: () => void;
    textContent: string;
    type?: 'proceed' | 'cancel' | 'attention';
    extraClass?: string;
}
const ConfirmationButton: React.FC<Props> = ({ onClick, textContent, type = 'proceed', extraClass }) => {
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
            {textContent}
        </button>
    );
};

export default ConfirmationButton;
