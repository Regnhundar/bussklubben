import useGameStore from "../../stores/gameStore";
import "./jumbotronInfoField.css";
interface Props {
    variable: number;
    unit: string;
    src: string;
    type: "timer" | "points";
}
const JumbotronInfoField: React.FC<Props> = ({ variable, unit, src, type }) => {
    const isPreparationTime = useGameStore((state) => state.isPreparationTime);
    const totalTime = useGameStore((state) => state.totalTime);
    const finalSeconds =
        !isPreparationTime && type === "timer" && totalTime <= 10 ? "jumbotron-info-field--final-seconds" : "";

    return (
        <figure
            className={`jumbotron-info-field ${isPreparationTime ? "jumbotron-info-field--preparing" : finalSeconds}`}>
            <img className="jumbotron-info-field__icon" src={src} alt="" />
            <div className="jumbotron-info-field__wrapper">
                <h2 className={`jumbotron-info-field__data ${finalSeconds}`}>{variable}</h2>
                <h3 className="jumbotron-info-field__unit-info">{unit}</h3>
            </div>
        </figure>
    );
};

export default JumbotronInfoField;
