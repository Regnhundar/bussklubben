import { useEffect, useState } from 'react';
import AbilityBar from './components/AbilityBar/AbilityBar';
import GameBoard from './components/GameBoard/GameBoard';
import GameLoop from './components/GameLoop/GameLoop';
import Jumbotron from './components/Jumbotron/Jumbotron';
import StartScreen from './components/StartScreen/StartScreen';
import { PREPARATION_TIME, TOTAL_TIME } from './constants';
import useGameBoardStore from './stores/gameBoardStore';
import useGameStore from './stores/gameStore';
import { createGameBoardArray, generateStartAndFinishIndex } from './utils/utilityFunctions';
import PreLoader from './components/PreLoader/PreLoader';
import Loader from './components/Loader/Loader';

function App() {
    const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);
    const { setGameBoardArray, setStartingIndex, setEndingIndex } = useGameBoardStore();
    const {
        isGameRunning,
        setIsGameOver,
        setIsGameRunning,
        setIsPreparationTime,
        setTotalTime,
        setPreparationTime,
        setPoints,
        setLevel,
    } = useGameStore();

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
    };

    useEffect(() => {
        const checkLoader = setInterval(() => {
            console.log('Rensas korrekt?');
            if (document.getElementById('loader')) {
                clearInterval(checkLoader);
                window.ClubHouseGame.gameLoaded({ hideInGame: true });
            }
        }, 100);
        window.ClubHouseGame.registerRestart(startGame);
        return () => clearInterval(checkLoader);
    }, []);

    return (
        <>
            <PreLoader isGameLoaded={isGameLoaded} setIsGameLoaded={setIsGameLoaded} />
            <div id='ui'></div>
            <div className='loader' id='loader'>
                <p className='loader-text'>Startar</p>
                <img className='loader-logo' src='/images/logo.png' />
                <img className='spinner' src='/images/spinner.svg' />
            </div>
            {!isGameLoaded ? (
                <Loader />
            ) : isGameRunning ? (
                <main className='game'>
                    <Jumbotron />
                    <GameBoard startFunction={startGame} />
                    <AbilityBar />
                    <GameLoop />
                </main>
            ) : (
                <StartScreen startFunction={startGame} />
            )}
        </>
    );
}

export default App;
