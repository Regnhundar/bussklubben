import { useState } from 'react';
import AbilityBar from './components/AbilityBar/AbilityBar';
import GameBoard from './components/GameBoard/GameBoard';
import GameLoop from './components/GameLoop/GameLoop';
import Jumbotron from './components/Jumbotron/Jumbotron';
import { PREPARATION_TIME, TOTAL_TIME } from './constants';
import useGameBoardStore from './stores/gameBoardStore';
import useGameStore from './stores/gameStore';
import { createGameBoardArray, generateStartAndFinishIndex } from './utils/utilityFunctions';
import ClubHouseGameUI from './components/ClubHouseGameUI/ClubHouseGameUI';
import PreLoader from './components/PreLoader/PreLoader';
import { AnimatePresence } from 'motion/react';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';

function App() {
    const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);
    const { setGameBoardArray, setStartingIndex, setEndingIndex } = useGameBoardStore();
    const {
        isGameRunning,
        isGameOver,
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

    return (
        <>
            <PreLoader isGameLoaded={isGameLoaded} setIsGameLoaded={setIsGameLoaded} />
            <ClubHouseGameUI startGame={startGame} />
            {(isGameOver || !isGameRunning) && <BackgroundAnimation />}
            <AnimatePresence>
                {isGameRunning && isGameLoaded && !isGameOver && (
                    <main className='game'>
                        <Jumbotron />
                        <GameBoard />
                        <AbilityBar />
                        <GameLoop />
                    </main>
                )}
            </AnimatePresence>
        </>
    );
}

export default App;
