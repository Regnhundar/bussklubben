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
import {
    checkForOutOfBounds,
    createGameBoardArray,
    determineDirection,
    generateStartAndFinishIndex,
    squareToCheck,
} from '../../utils/utilityFunctions';
import { validGameBoardIndices } from '../../data/gameBoard';

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
        setIsExiting,
    } = useGameBoardStore();
    const [numberOfSquaresChecked, setNumberOfSquaresChecked] = useState<number>(0);
    const prepTimerRef = useRef<number | null>(null);
    const gameTimerRef = useRef<number | null>(null);
    const squareTimerRef = useRef<number | null>(null);

    const isSquareConnected =
        typeof nextSquareToCheckIndex === 'number' &&
        typeof arrivalIndex === 'number' &&
        gameBoardArray[nextSquareToCheckIndex].isRevealed &&
        gameBoardArray[nextSquareToCheckIndex].tile.connections[arrivalIndex] === true;

    const nextSquareTimer =
        squareSpeed === 'turbo'
            ? SQUARE_TIMER * TURBO_MULTIPLIER
            : squareSpeed === 'slow'
            ? SQUARE_TIMER * SLOW_MULTIPLIER
            : SQUARE_TIMER;

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

    // Uppdaterar tidsnedräkningen för avgång.
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

    // Uppdaterar speltiden och sätter game-over om den når 0. Startar också timer på första rutan.
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
        if (isGameOver) {
            gameOver();
        }
    }, [isPreparationTime, isGameOver]);

    // Startar timer för när nästa ruta.
    useEffect(() => {
        if (!isPreparationTime && !isGameOver) {
            handleNextSquareTimer();
        }
    }, [nextSquareToCheckIndex]);

    // Hanterar vad som händer när nästa ruta aktiveras. Triggas av handleNextSquareTimer.
    useEffect(() => {
        if (!isPreparationTime && !isGameOver) {
            handleNextSquare();
        }
    }, [numberOfSquaresChecked]);

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
                        setIsGameOver(true);
                        return 0;
                    }
                });
            }, 1000);
        }
    };

    // Om nästa ruta finns på brädet och är kopplad aktiveras den och timer startas för att kontrollera nästa ruta.
    const handleNextSquareTimer = () => {
        if (nextSquareToCheckIndex !== null && validGameBoardIndices.includes(nextSquareToCheckIndex)) {
            if (nextSquareToCheckIndex >= 0 && isSquareConnected) {
                updateGameSquare(nextSquareToCheckIndex, { isActive: true });
                if (squaresToSwap.includes(nextSquareToCheckIndex)) {
                    setSquaresToSwap();
                }

                squareTimerRef.current = window.setTimeout(() => {
                    setNumberOfSquaresChecked((prev) => prev + 1);
                    // updateGameSquare(nextSquareToCheckIndex, { isPreviousSquare: true, isActive: false });
                }, nextSquareTimer * 1000);
                return () => {
                    if (squareTimerRef.current) {
                        clearTimeout(squareTimerRef.current);
                    }
                };
            }
            setIsGameOver(true);
            return;
        }
    };
    // Hanterar vad som ska hända när nästa ruta aktiveras. Poäng uppdateras, kollar om man är "out of bounds" eller om level är klar. Uppdaterar vilken ruta som ska kollas näst.
    const handleNextSquare = () => {
        setPoints((prev) => prev + POINTS_PER_SQUARE);
        if (nextSquareToCheckIndex !== null && arrivalIndex !== null) {
            const direction = determineDirection(nextSquareToCheckIndex, arrivalIndex);
            const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
            const isOutOfBounds = checkForOutOfBounds(nextSquareToCheckIndex, direction);
            const nextSquare = squareToCheck(nextSquareToCheckIndex, direction);

            if (
                (nextSquareToCheckIndex !== endingIndex && isOutOfBounds) ||
                (nextSquareToCheckIndex === endingIndex && isOutOfBounds && direction !== finishConnectionIndex)
            ) {
                setIsGameOver(true);
                return;
            }
            if (nextSquareToCheckIndex === endingIndex && direction === finishConnectionIndex) {
                handleCompleteLevel();
                return;
            } else {
                setNextSquareToCheckIndex(nextSquare);
                setArrivalIndex(willArriveFrom);
            }
        }
    };

    const handleCompleteLevel = () => {
        clearTimers();

        setIsExiting(true);

        setTimeout(
            () => {
                setIsExiting(false);
                setLevel((prev) => prev + 1);
            },
            nextSquareTimer < SQUARE_TIMER ? (nextSquareTimer + 0.2) * 1000 : (nextSquareTimer / 2) * 1000
        );
    };

    // Hanterar reset vid klarad bana
    const handleNextLevel = () => {
        if (level !== 1) {
            const adjustedPrepTime = PREPARATION_TIME - (level - 1) > 10 ? PREPARATION_TIME - (level - 1) : 10;
            const adjustedBonusTime = BONUS_TIME - (level - 2) > 5 ? BONUS_TIME - (level - 2) : 5;
            const startAndFinishIndex = generateStartAndFinishIndex();
            const gameBoard = createGameBoardArray();
            setNextSquareToCheckIndex(null);
            setJokerTile(null);
            setPoints((prev) => prev + POINTS_PER_LEVEL);
            setTotalTime((prev) => prev + adjustedBonusTime);
            setArrivalIndex(null);
            setStartingIndex(null);
            setEndingIndex(null);
            setTimeout(() => {
                //! Anledningen till timeout: om startingIndex och endingIndex är samma två banor på rad så får vi inget nytt "nextSquareIndex". Så först resettar vi till null, för att säkerställa att startingIndex/endingIndex blir förnyat i useEffect i komponenten GameBoard.
                setStartingIndex(startAndFinishIndex.start);
                setEndingIndex(startAndFinishIndex.finish);
            }, 0);
            setGameBoardArray(gameBoard);
            setPreparationTime(adjustedPrepTime);
            setIsPreparationTime(true);
            setSquareSpeed('normal');
        }
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
