import { useEffect, useState } from 'react';
import useGameStore from '../../stores/gameStore';
import { PREPARATION_TIME, TOTAL_TIME } from '../../constants';
import useGameBoardStore from '../../stores/gameBoardStore';

const GameLoop: React.FC = () => {
    const {
        isGameOver,
        setIsGameOver,
        setIsGameRunning,
        isGameRunning,
        setTotalTime,
        isPreparationTime,
        setIsPreparationTime,
    } = useGameStore();
    const {
        startingIndex,
        setStartingIndex,
        setEndingIndex,
        gameBoardArray,
        setGameBoardArray,
        setStartConnectionIndex,
        startConnectionIndex,
    } = useGameBoardStore();
    const [checkStartConnection, setCheckStartConnection] = useState(false);

    // Startar timern för kontroll av första rutan.
    useEffect(() => {
        if (isPreparationTime) {
            const prepTime = setTimeout(() => {
                setCheckStartConnection(true);
            }, PREPARATION_TIME * 1000);

            return () => clearTimeout(prepTime);
        }
    }, [isPreparationTime]);

    // Kontrollerar om startrutan är kopplad korrekt. Sätter game over ifall den inte är det.
    useEffect(() => {
        if (checkStartConnection && isGameRunning && startingIndex !== null && startConnectionIndex !== null) {
            const isStartingSquareConnected =
                gameBoardArray[startingIndex].isRevealed &&
                gameBoardArray[startingIndex].tile.connections[startConnectionIndex] === true;
            console.log(isStartingSquareConnected);
            if (isStartingSquareConnected) {
                setIsPreparationTime(false);
                setGameBoardArray((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[startingIndex] = { ...newBoard[startingIndex], isActive: true };
                    return newBoard;
                });
            } else {
                setIsGameOver(true);
            }
        }
    }, [checkStartConnection]);

    // Hanterar reset vid game over.
    useEffect(() => {
        if (isGameOver) {
            setIsGameRunning(false);
            setIsPreparationTime(false);
            setStartingIndex(null);
            setEndingIndex(null);
            setStartConnectionIndex(null);
            setCheckStartConnection(false);
            setTotalTime(TOTAL_TIME);
            setIsGameOver(false);
        }
    }, [isGameOver]);

    return null;
};

export default GameLoop;
