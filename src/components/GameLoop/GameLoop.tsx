import { useEffect, useState } from 'react';
import useGameStore from '../../stores/gameStore';
import { PREPARATION_TIME, SQUARE_TIMER, TOTAL_TIME } from '../../constants';
import useGameBoardStore from '../../stores/gameBoardStore';
import { createGameBoardArray, generateStartAndFinishIndex } from '../../utils/utilityFunctions';

const GameLoop: React.FC = () => {
    const {
        isGameOver,
        setIsGameOver,
        setIsGameRunning,
        isGameRunning,
        setTotalTime,
        level,
        setLevel,
        isPreparationTime,
        setIsPreparationTime,
    } = useGameStore();
    const {
        startingIndex,
        setStartingIndex,
        endingIndex,
        setEndingIndex,
        finishConnectionIndex,
        gameBoardArray,
        setGameBoardArray,
        setStartConnectionIndex,
        startConnectionIndex,
    } = useGameBoardStore();
    const [checkStartConnection, setCheckStartConnection] = useState<boolean>(false);
    const [nextSquareToCheckIndex, setNextSquareToCheckIndex] = useState<null | number>(null);
    const [arrivalIndex, setArrivalIndex] = useState<null | number>(null);
    const [numberOfSquaresChecked, setNumberOfSquaresChecked] = useState<number>(0);

    // Startar timern för kontroll av första rutan.
    useEffect(() => {
        if (isPreparationTime) {
            setCheckStartConnection(false);
            const prepTime = setTimeout(() => {
                setCheckStartConnection(true);
            }, PREPARATION_TIME * 1000);

            return () => clearTimeout(prepTime);
        }
    }, [isPreparationTime]);

    // Kontrollerar om startrutan är kopplad korrekt. Sätter game over ifall den inte är det.
    // useEffect(() => {
    //     if (checkStartConnection && isGameRunning && startingIndex !== null && startConnectionIndex !== null) {
    //         console.log('Starting on square:', startingIndex);
    //         const isStartingSquareConnected =
    //             gameBoardArray[startingIndex].isRevealed &&
    //             gameBoardArray[startingIndex].tile.connections[startConnectionIndex] === true;

    //         if (isStartingSquareConnected) {
    //             setIsPreparationTime(false);
    //             setGameBoardArray((prevBoard) => {
    //                 const newBoard = [...prevBoard];
    //                 newBoard[startingIndex] = { ...newBoard[startingIndex], isActive: true };
    //                 return newBoard;
    //             });
    //             const direction = determineDirection(startingIndex, startConnectionIndex);
    //             const isOutOfBounds = checkForOutOfBounds(startingIndex, direction);
    //             if (isOutOfBounds) {
    //                 setIsGameOver(true);
    //             }
    //             const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
    //             const nextSquare = squareToCheck(startingIndex, direction);

    //             setArrivalIndex(willArriveFrom);
    //             setNextSquareToCheckIndex(nextSquare);
    //         } else {
    //             setIsGameOver(true);
    //         }
    //     }
    // }, [checkStartConnection]);

    // Kontrollerar om startrutan är kopplad korrekt. Sätter game over ifall den inte är det.
    useEffect(() => {
        if (checkStartConnection && isGameRunning && startingIndex !== null && startConnectionIndex !== null) {
            console.log('Starting on square:', startingIndex);
            const isStartingSquareConnected =
                gameBoardArray[startingIndex].isRevealed &&
                gameBoardArray[startingIndex].tile.connections[startConnectionIndex] === true;

            if (isStartingSquareConnected) {
                setIsPreparationTime(false);
                setGameBoardArray((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[startingIndex] = { ...newBoard[startingIndex], isActive: true };
                    return newBoard;
                });
                const direction = determineDirection(startingIndex, startConnectionIndex);
                const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
                const nextSquare = squareToCheck(startingIndex, direction);

                setArrivalIndex(willArriveFrom);
                setNextSquareToCheckIndex(nextSquare);
            } else {
                setIsGameOver(true);
            }
        }
    }, [checkStartConnection]);

    // Startar timer för att kontrollera nästa ruta.
    useEffect(() => {
        if (
            nextSquareToCheckIndex !== null &&
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].includes(
                nextSquareToCheckIndex
            )
        ) {
            if (
                gameBoardArray[nextSquareToCheckIndex].isRevealed &&
                gameBoardArray[nextSquareToCheckIndex].tile.connections.includes(true) // kollar om det är en stoppskylt.
            ) {
                console.log('Started timer on square:', nextSquareToCheckIndex);

                const squareTimer = setTimeout(() => {
                    setNumberOfSquaresChecked((prev) => prev + 1);
                    setGameBoardArray((prevBoard) => {
                        const newBoard = [...prevBoard];
                        newBoard[nextSquareToCheckIndex] = { ...newBoard[nextSquareToCheckIndex], isActive: true };
                        return newBoard;
                    });
                }, SQUARE_TIMER * 1000);

                return () => clearTimeout(squareTimer);
            }
            return setIsGameOver(true);
        }
    }, [nextSquareToCheckIndex]);

    // Kontrollerar om ruta är kopplad.
    useEffect(() => {
        if (nextSquareToCheckIndex !== null && arrivalIndex !== null && numberOfSquaresChecked > 0) {
            const direction = determineDirection(nextSquareToCheckIndex, arrivalIndex);
            const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
            setArrivalIndex(willArriveFrom);
            const isOutOfBounds = checkForOutOfBounds(nextSquareToCheckIndex, direction);
            const nextSquare = squareToCheck(nextSquareToCheckIndex, direction);

            if (nextSquareToCheckIndex !== endingIndex && isOutOfBounds) {
                console.log('nextSquareToCheckIndex:', nextSquareToCheckIndex, 'endingIndex', endingIndex);
                console.log('OUT OF BOUNDS!');
                return setIsGameOver(true);
            }
            console.log('Activating square:', nextSquare);
            if (nextSquareToCheckIndex === endingIndex) {
                // const isNotAStopSign = gameBoardArray[nextSquare].tile.connections.includes(true);
                if (direction === finishConnectionIndex) {
                    console.log('Ny bana bra bra');
                    return setLevel((prev) => prev + 1);
                }
            }

            setNextSquareToCheckIndex(nextSquare);
        }
    }, [numberOfSquaresChecked]);

    useEffect(() => {
        if (arrivalIndex !== null && nextSquareToCheckIndex !== null && nextSquareToCheckIndex !== endingIndex) {
            const isSquareConnected =
                gameBoardArray[nextSquareToCheckIndex].isRevealed &&
                gameBoardArray[nextSquareToCheckIndex].tile.connections[arrivalIndex] === true;
            if (!isSquareConnected) {
                console.log('Not connected!');
                return setIsGameOver(true);
            }
        }
    }, [arrivalIndex]);

    const checkForOutOfBounds = (indexOfSquare: number, indexOfDirection: number) => {
        const noUp = [0, 1, 2, 3, 4];
        const noRight = [4, 9, 14, 19, 24];
        const noDown = [20, 21, 22, 23, 24];
        const noLeft = [0, 5, 10, 15, 20];
        if (noUp.includes(indexOfSquare) && indexOfDirection === 0) {
            return true;
        }
        if (noRight.includes(indexOfSquare) && indexOfDirection === 1) {
            return true;
        }
        if (noDown.includes(indexOfSquare) && indexOfDirection === 2) {
            return true;
        }
        if (noLeft.includes(indexOfSquare) && indexOfDirection === 3) {
            return true;
        }
        return false;
    };

    const determineDirection = (currentSquare: number, arrivedFromIndex: number) => {
        const determineDirection = gameBoardArray[currentSquare].tile.connections.findIndex(
            (value, index) => value === true && index !== arrivedFromIndex
        );
        return determineDirection;
    };

    const squareToCheck = (currentSquare: number, direction: number) => {
        const nextSquare =
            direction === 0
                ? currentSquare - 5 // Upp
                : direction === 1
                ? currentSquare + 1 // Höger
                : direction === 2
                ? currentSquare + 5 // Ned
                : currentSquare - 1; // Vänster
        return nextSquare;
    };
    // Hanterar reset vid klarad bana
    useEffect(() => {
        if (level !== 1) {
            const startAndFinishIndex = generateStartAndFinishIndex();
            const gameBoard = createGameBoardArray();
            setArrivalIndex(null);
            setNextSquareToCheckIndex(null);
            setStartingIndex(startAndFinishIndex.start);
            setEndingIndex(startAndFinishIndex.finish);
            setGameBoardArray(gameBoard);
            setIsPreparationTime(true);
        }
    }, [level]);
    // Hanterar reset vid game over.
    useEffect(() => {
        if (isGameOver) {
            console.log('GAME OVER!');
            setIsGameRunning(false);
            setIsPreparationTime(false);
            setStartingIndex(null);
            setEndingIndex(null);
            setStartConnectionIndex(null);
            setCheckStartConnection(false);
            setNextSquareToCheckIndex(null);
            setNumberOfSquaresChecked(0);
            setArrivalIndex(null);
            setTotalTime(TOTAL_TIME);
            setLevel(1);
            setIsGameOver(false);
        }
    }, [isGameOver]);

    return null;
};

export default GameLoop;
