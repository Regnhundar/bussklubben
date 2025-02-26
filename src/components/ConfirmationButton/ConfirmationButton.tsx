import { useState } from 'react';
import './confirmationButton.css';
interface Props {
    onClick: () => void;
    textContent: string;
    type?: 'proceed' | 'cancel' | 'attention';
}
const ConfirmationButton: React.FC<Props> = ({ onClick, textContent, type = 'proceed' }) => {
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
                    ? `confirmation-button confirmation-button--${type} confirmation-button--pressed`
                    : `confirmation-button confirmation-button--${type}`
            }
            onClick={handleFunction}
            disabled={isPressed}>
            {textContent}
        </button>
    );
};

export default ConfirmationButton;
