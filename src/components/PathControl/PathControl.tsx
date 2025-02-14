import { useEffect, useState } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import { checkForOutOfBounds, determineDirection, squareToCheck } from '../../utils/utilityFunctions';
import useGameStore from '../../stores/gameStore';
import { Connections, GameBoardIndices } from '../../types/type';
import { validGameBoardIndices } from '../../data/gameBoard';

const PathControl: React.FC = () => {
    const { gameBoardArray, setGameBoardArray, arrivalIndex, startingIndex, startConnectionIndex, updateGameSquare } =
        useGameBoardStore();
    const { isGameOver, isGameRunning } = useGameStore();
    const [checkNext, setConnectedIndices] = useState<GameBoardIndices[]>([]);
    const [nextArrivedFromIndex, setNextArrivedFromIndex] = useState<Connections>();
    const [nextSquareInLine, setNextSquareInLine] = useState<GameBoardIndices>();

    const isGameStarted =
        isGameRunning &&
        !isGameOver &&
        startingIndex !== null &&
        startConnectionIndex !== null &&
        arrivalIndex !== null;

    const isFirstSquareConnected = isGameStarted
        ? gameBoardArray[startingIndex].isRevealed &&
          gameBoardArray[startingIndex].tile.connections[startConnectionIndex] === true
        : false;

    const isSquareConnected =
        typeof nextSquareInLine === 'number' &&
        typeof nextArrivedFromIndex === 'number' &&
        gameBoardArray[nextArrivedFromIndex].isRevealed &&
        gameBoardArray[nextArrivedFromIndex].tile.connections[nextArrivedFromIndex] === true;

    useEffect(() => {
        if (isGameStarted && isFirstSquareConnected) {
            setNextSquareInLine(startingIndex);
            setNextArrivedFromIndex(startConnectionIndex);

            console.log('Checking connection');
        }
    }, [nextSquareInLine, gameBoardArray]);

    useEffect(() => {
        if (nextSquareInLine !== undefined && nextArrivedFromIndex !== undefined) {
            checkForConnection(nextSquareInLine, nextArrivedFromIndex);
        }
    }, [nextArrivedFromIndex, nextSquareInLine]);

    const checkForConnection = (squareIndex: GameBoardIndices, arrivedFrom: Connections) => {
        const direction = determineDirection(squareIndex, arrivedFrom);
        const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
        setNextArrivedFromIndex(willArriveFrom);
        const nextSquare = squareToCheck(squareIndex, direction);
        if (!validGameBoardIndices.includes(nextSquare)) {
            console.log('Invalid index.');
            return;
        }
        setNextSquareInLine(nextSquare);
        const isOutOfBounds = checkForOutOfBounds(nextSquare, direction);
        if (isOutOfBounds) {
            console.log('isOutOfBounds.');
            return;
        }

        if (!isSquareConnected) {
            console.log(nextSquare, 'Not connected.');
            return;
        }

        updateGameSquare(nextSquare, { isLinkedToStart: true });
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

    useEffect(() => {}, []);

    return null;
};

export default PathControl;
