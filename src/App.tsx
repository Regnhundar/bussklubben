import { useState } from 'react';
import AbilityBar from './components/AbilityBar/AbilityBar';
import GameBoard from './components/GameBoard/GameBoard';
import GameLoop from './components/GameLoop/GameLoop';
import Jumbotron from './components/Jumbotron/Jumbotron';
import useGameStore from './stores/gameStore';
import ClubHouseGameUI from './components/ClubHouseGameUI/ClubHouseGameUI';
import PreLoader from './components/PreLoader/PreLoader';
import { AnimatePresence } from 'motion/react';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import PathControl from './components/PathControl/PathControl';

function App() {
    const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);

    const { isGameRunning, isGameOver } = useGameStore();

    return (
        <>
            <PreLoader isGameLoaded={isGameLoaded} setIsGameLoaded={setIsGameLoaded} />
            <ClubHouseGameUI />
            {(isGameOver || !isGameRunning) && <BackgroundAnimation />}
            <AnimatePresence>
                {isGameRunning && isGameLoaded && !isGameOver && (
                    <main className='game'>
                        <Jumbotron />
                        <GameBoard />
                        <AbilityBar />
                        <PathControl />
                        <GameLoop />
                    </main>
                )}
            </AnimatePresence>
        </>
    );
}

export default App;
