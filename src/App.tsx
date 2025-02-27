import { useState } from 'react';
import useGameStore from './stores/gameStore';
import ClubHouseGameUI from './components/ClubHouseGameUI/ClubHouseGameUI';
import PreLoader from './components/PreLoader/PreLoader';
import { AnimatePresence } from 'motion/react';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import Tutorial from './components/Tutorial/Tutorial';
import Game from './components/Game/Game';

function App() {
    const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);

    const { isGameRunning, isGameOver, isTutorial } = useGameStore();

    return (
        <>
            <PreLoader isGameLoaded={isGameLoaded} setIsGameLoaded={setIsGameLoaded} />
            <ClubHouseGameUI />
            {(isGameOver || (!isGameRunning && isGameLoaded)) && <BackgroundAnimation />}
            {isGameRunning && isGameLoaded && !isGameOver && !isTutorial && (
                <AnimatePresence mode='wait'>
                    <Game />
                </AnimatePresence>
            )}
            <AnimatePresence mode='wait'>{isTutorial && <Tutorial />}</AnimatePresence>
        </>
    );
}

export default App;
