import { useState } from 'react';
import AbilityBar from './components/AbilityBar/AbilityBar';
import GameBoard from './components/GameBoard/GameBoard';
import GameLoop from './components/GameLoop/GameLoop';
import Jumbotron from './components/Jumbotron/Jumbotron';
import useGameStore from './stores/gameStore';
import ClubHouseGameUI from './components/ClubHouseGameUI/ClubHouseGameUI';
import PreLoader from './components/PreLoader/PreLoader';
import { AnimatePresence, motion } from 'motion/react';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import PathControl from './components/PathControl/PathControl';
import MessageOverlay from './components/MessageOverlay/MessageOverlay';

function App() {
    const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);

    const { isGameRunning, isGameOver } = useGameStore();

    return (
        <>
            <PreLoader isGameLoaded={isGameLoaded} setIsGameLoaded={setIsGameLoaded} />
            <ClubHouseGameUI />
            {(isGameOver || !isGameRunning) && <BackgroundAnimation />}
            <AnimatePresence mode='wait'>
                {isGameRunning && isGameLoaded && !isGameOver && (
                    <motion.main exit={{ opacity: 0 }} className='game'>
                        {/* <Jumbotron /> */}
                        <MessageOverlay />
                        <GameBoard />
                        <AbilityBar />
                        <PathControl />
                        <GameLoop />
                    </motion.main>
                )}
            </AnimatePresence>
        </>
    );
}

export default App;
