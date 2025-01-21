import { useEffect, useState } from 'react';
import AbilityBar from './components/AbilityBar/AbilityBar';
import GameBoard from './components/GameBoard/GameBoard';
import GameLoop from './components/GameLoop/GameLoop';
import Jumbotron from './components/Jumbotron/Jumbotron';

function App() {
    const [test, setTest] = useState(0);
    useEffect(() => {
        if (window.ClubHouseGame) {
            setTest((prev) => prev + 1);
        }
    }, []);
    useEffect(() => {
        if (window.ClubHouseGame) {
        }
    }, [test]);
    return (
        <>
            <Jumbotron />
            <GameBoard />
            <AbilityBar />
            <GameLoop />
        </>
    );
}

export default App;
