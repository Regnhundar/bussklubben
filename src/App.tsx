import AbilityBar from './components/AbilityBar/AbilityBar';
import GameBoard from './components/GameSquares/GameSquares';
import GameTracker from './components/GameTracker/GameTracker';

function App() {
    return (
        <>
            <GameTracker />
            <GameBoard />
            <AbilityBar />
        </>
    );
}

export default App;
