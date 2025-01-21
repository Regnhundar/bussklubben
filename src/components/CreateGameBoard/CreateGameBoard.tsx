import { useEffect } from 'react';
import useGameStore from '../../stores/gameStore';
import { PREPARATION_TIME } from '../../constants';
import useGameBoardStore from '../../stores/gameBoardStore';

const GameLoop: React.FC = () => {
    const { isGameOver, isGameRunning, level, preparationTime, totalTime } = useGameStore();
    const { startingIndex, gameBoardArray, startConnectionIndex } = useGameBoardStore();

    useEffect(() => {
        if (isGameRunning) {
            const prepTime = setTimeout(() => {
                const isStartingSquareConnected =
                    startingIndex !== null &&
                    startConnectionIndex !== null &&
                    gameBoardArray[startingIndex].tile.connections[startConnectionIndex] === true;
                console.log('isStartingSquareConnected', isStartingSquareConnected);
                startingIndex && console.log(gameBoardArray[startingIndex]);
            }, PREPARATION_TIME * 1000);

            return () => clearTimeout(prepTime);
        }
    }, [level]);

    return null;
};

export default GameLoop;
