import { Ability } from "../../interfaces/ability";
import useGameStore from "../../stores/gameStore";
import "./abilityButton.css";
interface Props {
    ability: Ability;
}
const AbilityButton: React.FC<Props> = ({ ability }) => {
    const isGameOverConfirmation = useGameStore((state) => state.isGameOverConfirmation);
    return (
        <div
            className={
                isGameOverConfirmation || ability.state === "ability__button--disabled"
                    ? "ability ability--disabled"
                    : `ability ability--${ability.class}`
            }
            onClick={isGameOverConfirmation ? undefined : ability.func}>
            <button className={`ability__button ${ability.state}`}>
                <img src={ability.src} alt={ability.alt} className="ability-button__image" />
            </button>
            <h3
                className={`ability-button__name ${
                    ability.state === "ability__button--disabled" || ability.state === "ability__button--speed-active"
                        ? "ability-button__name--disabled"
                        : ability.state === "ability__button--turbo-suggestion"
                        ? "ability-button__name--turbo-suggestion"
                        : ""
                }`}>
                {ability.name.toUpperCase()}
            </h3>
        </div>
    );
};

export default AbilityButton;
