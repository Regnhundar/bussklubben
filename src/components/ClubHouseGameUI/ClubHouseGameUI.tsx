import { useEffect } from "react";
import "./clubHouseGameUI.css";
import useGameBoardStore from "../../stores/gameBoardStore";
import useGameStore from "../../stores/gameStore";
import { createGameBoardArray, generateStartAndFinishIndex } from "../../utils/utilityFunctions";
import { PREPARATION_TIME, TOTAL_TIME } from "../../constants";
import { useShallow } from "zustand/react/shallow";

const ClubHouseGameUI: React.FC = () => {
    const { setGameBoardArray, setStartingIndex, setEndingIndex } = useGameBoardStore(
        useShallow((state) => ({
            setGameBoardArray: state.setGameBoardArray,
            setStartingIndex: state.setStartingIndex,
            setEndingIndex: state.setEndingIndex,
        }))
    );
    const {
        setIsGameOver,
        setIsGameRunning,
        setIsPreparationTime,
        setTotalTime,
        setPreparationTime,
        setPoints,
        setLevel,
        isTutorial,
        setIsTutorial,
    } = useGameStore(
        useShallow((state) => ({
            setIsGameOver: state.setIsGameOver,
            setIsGameRunning: state.setIsGameRunning,
            setIsPreparationTime: state.setIsPreparationTime,
            setTotalTime: state.setTotalTime,
            setPreparationTime: state.setPreparationTime,
            setPoints: state.setPoints,
            setLevel: state.setLevel,
            isTutorial: state.isTutorial,
            setIsTutorial: state.setIsTutorial,
        }))
    );

    useEffect(() => {
        const startGame = () => {
            const startAndFinishIndex = generateStartAndFinishIndex();
            const gameBoard = createGameBoardArray();
            setIsGameRunning(true);
            setIsGameOver(false);
            setStartingIndex(startAndFinishIndex.start);
            setEndingIndex(startAndFinishIndex.finish);
            setGameBoardArray(gameBoard);
            setPreparationTime(PREPARATION_TIME);
            setTotalTime(TOTAL_TIME);
            setIsPreparationTime(true);
            setPoints(0);
            setLevel(1);
            setIsTutorial(false);
        };
        window.ClubHouseGame.registerRestart(startGame);

        //! TA BORT OM SDK FIXAS! SDK servar felaktigt bilder utan "./" i pathen för logo och spinner.
        const fixImagePaths = () => {
            const images = document.querySelectorAll('img[src^="/images/"]');
            images.forEach((img) => {
                const src = img.getAttribute("src");
                if (src?.startsWith("/images/")) {
                    img.setAttribute("src", `.${src}`);
                }
            });
        };

        fixImagePaths();
        const observer = new MutationObserver(fixImagePaths);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div id="ui" className={isTutorial ? "d-none" : ""}></div>
            <div className="loader" id="loader">
                <p className="loader-text">Startar</p>
                <img className="loader-logo" src="./images/logo.png" />
                <img className="spinner" src="./images/spinner.svg" />
            </div>
        </>
    );
};

export default ClubHouseGameUI;
