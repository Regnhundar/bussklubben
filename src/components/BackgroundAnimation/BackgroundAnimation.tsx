import { useShallow } from "zustand/shallow";
import useGameStore from "../../stores/gameStore";
import ConfirmationButton from "../ConfirmationButton/ConfirmationButton";
import "./backgroundAnimation.css";

const BackgroundAnimation: React.FC = () => {
    const { isTutorial, setIsTutorial } = useGameStore(
        useShallow((state) => ({
            isTutorial: state.isTutorial,
            setIsTutorial: state.setIsTutorial,
        }))
    );

    return (
        <>
            {!isTutorial && (
                <ConfirmationButton
                    onClick={() => setIsTutorial(true)}
                    textContent="?"
                    type="attention"
                    extraClass="confirmation-button--tutorial"
                />
            )}
            <div aria-hidden="true" className="background">
                {!isTutorial && (
                    <>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </>
                )}
            </div>
        </>
    );
};

export default BackgroundAnimation;

// CREDIT TO Mohammad Abdul Mohaiman's codepen that gave me a starting off point: https://codepen.io/mohaiman/pen/MQqMyo
