import AbilityBar from './components/AbilityBar/AbilityBar';
import GameBoard from './components/GameBoard/GameBoard';
import GameLoop from './components/GameLoop/GameLoop';
import Jumbotron from './components/Jumbotron/Jumbotron';

function App() {
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
