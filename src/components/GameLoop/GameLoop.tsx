import { useEffect, useRef, useState } from 'react';
import useGameStore from '../../stores/gameStore';
import {
    BONUS_TIME,
    POINTS_PER_LEVEL,
    POINTS_PER_SQUARE,
    PREPARATION_TIME,
    SLOW_MULTIPLIER,
    SQUARE_TIMER,
    TURBO_MULTIPLIER,
} from '../../constants';
import useGameBoardStore from '../../stores/gameBoardStore';
import { createGameBoardArray, generateStartAndFinishIndex } from '../../utils/utilityFunctions';
import { Connections, GameBoardIndices } from '../../types/type';

const GameLoop: React.FC = () => {
    const {
        isGameOver,
        setIsGameOver,
        setTotalTime,
        level,
        setLevel,
        points,
        setPoints,
        isPreparationTime,
        setIsPreparationTime,
        setPreparationTime,
    } = useGameStore();
    const {
        setJokerTile,
        setStartingIndex,
        endingIndex,
        setEndingIndex,
        finishConnectionIndex,
        gameBoardArray,
        setGameBoardArray,
        squaresToSwap,
        setSquaresToSwap,
        squareSpeed,
        setSquareSpeed,
        updateGameSquare,
        nextSquareToCheckIndex,
        setNextSquareToCheckIndex,
        setArrivalIndex,
        arrivalIndex,
        startingIndex,
    } = useGameBoardStore();
    const [triggerArrival, setTriggerArrival] = useState<boolean>(false);
    const [numberOfSquaresChecked, setNumberOfSquaresChecked] = useState<number>(0);

    const prepTimerRef = useRef<number | null>(null);
    const gameTimerRef = useRef<number | null>(null);
    const squareTimerRef = useRef<number | null>(null);

    const validGameBoardIndices = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    ];
    const isStartingSquareConnected =
        typeof nextSquareToCheckIndex === 'number' &&
        typeof arrivalIndex === 'number' &&
        gameBoardArray[nextSquareToCheckIndex].isRevealed &&
        gameBoardArray[nextSquareToCheckIndex].tile.connections[arrivalIndex] === true;

    const clearTimers = () => {
        if (squareTimerRef.current) {
            clearTimeout(squareTimerRef.current);
        }
        if (prepTimerRef.current) {
            clearInterval(prepTimerRef.current);
        }
        if (gameTimerRef.current) {
            clearInterval(gameTimerRef.current);
        }
    };

    // Uppdaterar tidsnedräkningen för departure. Togglar checkStartConnection.
    useEffect(() => {
        if (isPreparationTime && !isGameOver) {
            handleDepartureTimer();
        }
        return () => {
            if (prepTimerRef.current) {
                clearInterval(prepTimerRef.current);
            }
        };
    }, [isPreparationTime]);

    // Uppdaterar speltiden och sätter game-over om den når 0. Triggas av handleStartSquareControl.
    useEffect(() => {
        if (!isPreparationTime && !isGameOver) {
            handleGameTimer();
            handleNextSquareTimer();
            return () => {
                if (gameTimerRef.current) {
                    clearInterval(gameTimerRef.current);
                }
            };
        }
    }, [isPreparationTime, isGameOver]);

    // Startar timer för när nästa ruta ska kontrolleras.
    useEffect(() => {
        if (!isPreparationTime && !isGameOver) {
            handleNextSquareTimer();
        }
    }, [nextSquareToCheckIndex]);

    // Kontrollerar om ruta är kopplad. Triggas av handleNextSquareTimer.
    useEffect(() => {
        if (!isPreparationTime && !isGameOver) {
            handleConnectionControl();
        }
    }, [numberOfSquaresChecked]);

    useEffect(() => {
        if (arrivalIndex !== null && nextSquareToCheckIndex !== null) {
            const isSquareConnected =
                gameBoardArray[nextSquareToCheckIndex].isRevealed &&
                gameBoardArray[nextSquareToCheckIndex].tile.connections[arrivalIndex] === true;
            if (!isSquareConnected) {
                gameOver();
                return;
            }
            setPoints((prev) => prev + POINTS_PER_SQUARE);
        }
    }, [triggerArrival]);

    useEffect(() => {
        if (level !== 1) {
            handleNextLevel();
        }
    }, [level]);

    const handleDepartureTimer = () => {
        if (prepTimerRef.current) {
            clearInterval(prepTimerRef.current);
        }

        if (isPreparationTime) {
            prepTimerRef.current = window.setInterval(() => {
                setPreparationTime((prev) => {
                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        if (prepTimerRef.current) {
                            clearInterval(prepTimerRef.current);
                        }
                        setIsPreparationTime(false);
                        return 0;
                    }
                });
            }, 1000);
        }
    };

    const handleGameTimer = () => {
        if (!isPreparationTime && !isGameOver) {
            gameTimerRef.current = window.setInterval(() => {
                setTotalTime((prev) => {
                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        gameOver();
                        return 0;
                    }
                });
            }, 1000);
        }
    };

    // Startar timer för att kontrollera nästa ruta.
    const handleNextSquareTimer = () => {
        if (nextSquareToCheckIndex === startingIndex && !isStartingSquareConnected) {
            gameOver();
            return;
        }
        if (nextSquareToCheckIndex !== null && validGameBoardIndices.includes(nextSquareToCheckIndex)) {
            if (
                nextSquareToCheckIndex >= 0 &&
                gameBoardArray[nextSquareToCheckIndex].isRevealed &&
                gameBoardArray[nextSquareToCheckIndex].tile.connections.includes(true) // kollar om det är en stoppskylt.
            ) {
                updateGameSquare(nextSquareToCheckIndex, { isActive: true });
                if (squaresToSwap.includes(nextSquareToCheckIndex)) {
                    setSquaresToSwap();
                }
                const nextSquareTimer =
                    squareSpeed === 'turbo'
                        ? SQUARE_TIMER * TURBO_MULTIPLIER
                        : squareSpeed === 'slow'
                        ? SQUARE_TIMER * SLOW_MULTIPLIER
                        : SQUARE_TIMER;
                squareTimerRef.current = window.setTimeout(() => {
                    setNumberOfSquaresChecked((prev) => prev + 1);
                    updateGameSquare(nextSquareToCheckIndex, { isPreviousSquare: true, isActive: false });
                }, nextSquareTimer * 1000);
                return () => {
                    if (squareTimerRef.current) {
                        clearTimeout(squareTimerRef.current);
                    }
                };
            }
            gameOver();
            return;
        }
    };

    const handleConnectionControl = () => {
        if (nextSquareToCheckIndex !== null && arrivalIndex !== null) {
            const direction = determineDirection(nextSquareToCheckIndex, arrivalIndex);
            const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
            const isOutOfBounds = checkForOutOfBounds(nextSquareToCheckIndex, direction);
            const nextSquare = squareToCheck(nextSquareToCheckIndex, direction);
            if (
                (nextSquareToCheckIndex !== endingIndex && isOutOfBounds) ||
                (nextSquareToCheckIndex === endingIndex && isOutOfBounds && direction !== finishConnectionIndex)
            ) {
                gameOver();
                return;
            }
            if (nextSquareToCheckIndex === endingIndex && direction === finishConnectionIndex) {
                setLevel((prev) => prev + 1);
                return;
            }

            setNextSquareToCheckIndex(nextSquare);
            setArrivalIndex(willArriveFrom);
            setTriggerArrival((prev) => !prev);
        }
    };

    // Hanterar reset vid klarad bana
    const handleNextLevel = () => {
        if (level !== 1) {
            setNextSquareToCheckIndex(null);
            setPoints((prev) => prev + POINTS_PER_LEVEL + POINTS_PER_SQUARE);
            setTotalTime((prev) => prev + BONUS_TIME);
            const startAndFinishIndex = generateStartAndFinishIndex();
            const gameBoard = createGameBoardArray();
            setArrivalIndex(null);
            setStartingIndex(startAndFinishIndex.start);
            setEndingIndex(startAndFinishIndex.finish);
            setGameBoardArray(gameBoard);
            const adjustedPrepTime = PREPARATION_TIME - (level - 1) >= 10 ? PREPARATION_TIME - (level - 1) : 10;
            setPreparationTime(adjustedPrepTime);
            setIsPreparationTime(true);
            setSquareSpeed('normal');
        }
    };

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

    const determineDirection = (currentSquare: GameBoardIndices, arrivedFromIndex: Connections): Connections => {
        const direction = gameBoardArray[currentSquare].tile.connections.findIndex(
            (value, index) => value === true && index !== arrivedFromIndex
        );
        return direction as Connections;
    };

    const squareToCheck = (currentSquare: GameBoardIndices, direction: Connections) => {
        const nextSquare =
            direction === 0
                ? currentSquare - 5 // Upp
                : direction === 1
                ? currentSquare + 1 // Höger
                : direction === 2
                ? currentSquare + 5 // Ned
                : currentSquare - 1; // Vänster
        return nextSquare as GameBoardIndices;
    };

    const gameOver = () => {
        setSquareSpeed('normal');
        setJokerTile(null);
        window.ClubHouseGame.setScore(points);
        setIsGameOver(true);
        clearTimers();
        window.ClubHouseGame.gameDone();
        setIsPreparationTime(false);
        setPreparationTime(PREPARATION_TIME);
        setStartingIndex(null);
        setEndingIndex(null);
        setNextSquareToCheckIndex(null);
        setNumberOfSquaresChecked(0);
        setArrivalIndex(null);
        setSquaresToSwap();
    };

    return null;
};

export default GameLoop;
