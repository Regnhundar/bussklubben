import { useEffect, useState } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import { checkForOutOfBounds, determineDirection, squareToCheck } from '../../utils/utilityFunctions';
import useGameStore from '../../stores/gameStore';
import { GameBoardIndices } from '../../types/type';

const PathControl: React.FC = () => {
    const { gameBoardArray, setGameBoardArray, arrivalIndex, startingIndex } = useGameBoardStore();
    const { isGameOver, isGameRunning } = useGameStore();
    const [connectedIndices, setConnectedIndices] = useState<GameBoardIndices[]>([]);
    const isGameStarted = isGameRunning && !isGameOver && startingIndex !== null && arrivalIndex !== null;

    const isFirstSquareConnected = isGameStarted
        ? gameBoardArray[startingIndex].tile.connections[arrivalIndex] === true
        : false;

    useEffect(() => {
        if (isGameStarted && isFirstSquareConnected) {
            const direction = determineDirection(startingIndex, arrivalIndex);
            const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
            const nextSquare = squareToCheck(startingIndex, direction);
            // const isOutOfBounds = checkForOutOfBounds(nextSquareToCheckIndex, direction);
            console.log('connecting');
        }
    }, [gameBoardArray]);

    const handleSquareDirection = (squareIndex: GameBoardIndices) => {
        if (arrivalIndex) {
            const direction = determineDirection(squareIndex, arrivalIndex);
            const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
            const nextSquare = squareToCheck(squareIndex, direction);
            return nextSquare;
        }
    };

    useEffect(() => {
        if (isGameStarted && !isFirstSquareConnected) {
            const disconnectedGameBoard = gameBoardArray.map((gameSquare) => ({
                ...gameSquare,
                isLinkedToStart: false,
            }));
            setGameBoardArray(disconnectedGameBoard);
            console.log('disconnecting');
        }
    }, [isFirstSquareConnected]);

    return null;
};

export default PathControl;
