import { useEffect } from 'react';
import './clubHouseGameUI.css';
import useGameBoardStore from '../../stores/gameBoardStore';
import useGameStore from '../../stores/gameStore';
import { createGameBoardArray, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import { PREPARATION_TIME, TOTAL_TIME } from '../../constants';

const ClubHouseGameUI: React.FC = () => {
    const { setGameBoardArray, setStartingIndex, setEndingIndex } = useGameBoardStore();
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
    } = useGameStore();

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
    }, []);

    return (
        <>
            <div id='ui' className={isTutorial ? 'd-none' : ''}></div>
            <div className='loader' id='loader'>
                <p className='loader-text'>Startar</p>
                <img className='loader-logo' src='/images/logo.png' />
                <img className='spinner' src='/images/spinner.svg' />
            </div>
        </>
    );
};

export default ClubHouseGameUI;
