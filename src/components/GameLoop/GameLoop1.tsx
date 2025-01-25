// import { useEffect, useRef, useState } from 'react';
// import useGameStore from '../../stores/gameStore';
// import { BONUS_TIME, POINTS_PER_LEVEL, PREPARATION_TIME, SQUARE_TIMER, TOTAL_TIME } from '../../constants';
// import useGameBoardStore from '../../stores/gameBoardStore';
// import { createGameBoardArray, generateStartAndFinishIndex } from '../../utils/utilityFunctions';

// const GameLoop: React.FC = () => {
//     const {
//         isGameOver,
//         setIsGameOver,
//         setIsGameRunning,
//         isGameRunning,
//         setTotalTime,
//         level,
//         setLevel,
//         points,
//         setPoints,
//         isPreparationTime,
//         setIsPreparationTime,
//         setPreparationTime,
//     } = useGameStore();
//     const {
//         startingIndex,
//         setStartingIndex,
//         endingIndex,
//         setEndingIndex,
//         finishConnectionIndex,
//         gameBoardArray,
//         setGameBoardArray,
//         setStartConnectionIndex,
//         startConnectionIndex,
//         setSquaresToSwap,
//     } = useGameBoardStore();
//     const [checkStartConnection, setCheckStartConnection] = useState<boolean>(false);
//     const [nextSquareToCheckIndex, setNextSquareToCheckIndex] = useState<null | number>(null);
//     const [triggerArrival, setTriggerArrival] = useState<boolean>(false);
//     const [arrivalIndex, setArrivalIndex] = useState<null | number>(null);
//     const [numberOfSquaresChecked, setNumberOfSquaresChecked] = useState<number>(0);

//     const prepTimerRef = useRef<number | null>(null);
//     const gameTimerRef = useRef<number | null>(null);
//     const squareTimerRef = useRef<number | null>(null);
//     const firstSquareTimerRef = useRef<number | null>(null);

//     const clearTimers = () => {
//         if (firstSquareTimerRef.current) {
//             clearTimeout(firstSquareTimerRef.current);
//         }
//         if (squareTimerRef.current) {
//             clearTimeout(squareTimerRef.current);
//         }
//         if (prepTimerRef.current) {
//             clearInterval(prepTimerRef.current);
//         }
//         if (gameTimerRef.current) {
//             clearInterval(gameTimerRef.current);
//         }
//     };

//     // Uppdaterar tidsnedräkningen för departure. Togglar checkStartConnection.
//     useEffect(() => {
//         handleDepartureTimer();
//         return () => {
//             if (prepTimerRef.current) {
//                 clearInterval(prepTimerRef.current);
//             }
//         };
//     }, [isPreparationTime]);

//     // Kontrollerar om startrutan är kopplad korrekt. Sätter game over ifall den inte är det. Triggas av handleDepartureTimer.
//     useEffect(() => {
//         handleStartSquareControl();
//     }, [checkStartConnection]);

//     // Uppdaterar speltiden och sätter game-over om den når 0. Triggas av handleStartSquareControl.
//     useEffect(() => {
//         if (!isPreparationTime && !isGameOver) {
//             handleGameTimer();

//             return () => {
//                 if (gameTimerRef.current) {
//                     clearInterval(gameTimerRef.current);
//                 }
//             };
//         }
//     }, [isPreparationTime, isGameOver]);

//     // Startar timer för när nästa ruta ska kontrolleras.
//     useEffect(() => {
//         handleNextSquareTimer();
//     }, [nextSquareToCheckIndex]);

//     // Kontrollerar om ruta är kopplad. Triggas av handleNextSquareTimer.
//     useEffect(() => {
//         handleConnectionControl();
//     }, [numberOfSquaresChecked]);

//     useEffect(() => {
//         console.log('row203 arrivalIndex:', arrivalIndex);
//         if (arrivalIndex !== null && nextSquareToCheckIndex !== null) {
//             const isSquareConnected =
//                 gameBoardArray[nextSquareToCheckIndex].isRevealed &&
//                 gameBoardArray[nextSquareToCheckIndex].tile.connections[arrivalIndex] === true;
//             if (!isSquareConnected) {
//                 console.log('Not connected!');
//                 gameOver();
//                 return;
//             }
//             console.log(nextSquareToCheckIndex, 'connected!');
//         }
//     }, [triggerArrival]);

//     useEffect(() => {
//         handleNextLevel();
//     }, [level]);

//     const handleDepartureTimer = () => {
//         if (prepTimerRef.current) {
//             clearInterval(prepTimerRef.current);
//         }

//         if (isPreparationTime) {
//             prepTimerRef.current = window.setInterval(() => {
//                 setPreparationTime((prev) => {
//                     if (prev > 1) {
//                         return prev - 1;
//                     } else {
//                         if (prepTimerRef.current) {
//                             clearInterval(prepTimerRef.current);
//                         }
//                         setCheckStartConnection(true);
//                         return 0;
//                     }
//                 });
//             }, 1000);
//         }
//     };

//     //! v2 handleDepartureTimer
//     // const handleDepartureTimer = () => {
//     //     if (isPreparationTime && preparationTime === 0 && !isGameOver) {
//     //         setCheckStartConnection(true);
//     //         return;
//     //     }
//     //     if (isPreparationTime && !isGameOver) {
//     //         prepTimerRef.current = window.setTimeout(() => {
//     //             setPreparationTime((prev) => (prev > 0 ? prev - 1 : 0));
//     //         }, 1000);
//     //     }
//     // };

//     //! v3 handleGameTimer
//     const handleGameTimer = () => {
//         if (gameTimerRef.current) {
//             clearInterval(gameTimerRef.current);
//         }

//         if (!isPreparationTime && !isGameOver) {
//             gameTimerRef.current = window.setInterval(() => {
//                 setTotalTime((prev) => {
//                     if (prev > 1) {
//                         return prev - 1;
//                     } else {
//                         console.log('SLUT PÅ TID! GAME OVER MAN!');
//                         if (gameTimerRef.current) {
//                             clearInterval(gameTimerRef.current);
//                         }
//                         gameOver();
//                         return 0;
//                     }
//                 });
//             }, 1000);
//         }
//     };
//     //! v2 handleGameTimer
//     // Uppdaterar tidsnedräkningen för speltid.
//     // const handleGameTimer = () => {
//     //     if (totalTime === 0 && !isPreparationTime && !isGameOver) {
//     //         console.log('SLUT PÅ TID! GAME OVER MAN!');
//     //         gameOver();
//     //         return;
//     //     }
//     //     if (!isPreparationTime && !isGameOver) {
//     //         gameTimerRef.current = window.setTimeout(() => {
//     //             if (totalTime !== 0) {
//     //                 setTotalTime((prev) => (prev > 0 ? prev - 1 : 0));
//     //             }
//     //         }, 1000);
//     //     }
//     // };
//     //! v1 handleGameTimer
//     // const handleGameTimer = () => {
//     //     if (totalTime === 0 && !isPreparationTime && !isGameOver) {
//     //         console.log('SLUT PÅ TID! GAME OVER MAN!');
//     //         return gameOver();
//     //     }
//     //     if (!isPreparationTime && !isGameOver) {
//     //         const gameTimer = setTimeout(() => {
//     //             if (totalTime !== 0) {
//     //                 setTotalTime((prev) => prev - 1);
//     //             }
//     //         }, 1000);

//     //         return () => clearTimeout(gameTimer);
//     //     }
//     // };

//     const handleStartSquareControl = () => {
//         if (checkStartConnection && isGameRunning && startingIndex !== null && startConnectionIndex !== null) {
//             console.log('Starting on square:', startingIndex);
//             const isStartingSquareConnected =
//                 gameBoardArray[startingIndex].isRevealed &&
//                 gameBoardArray[startingIndex].tile.connections[startConnectionIndex] === true;

//             if (isStartingSquareConnected) {
//                 const direction = determineDirection(startingIndex, startConnectionIndex);
//                 const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
//                 const nextSquare = squareToCheck(startingIndex, direction);
//                 const isOutOfBounds = checkForOutOfBounds(startingIndex, direction);

//                 firstSquareTimerRef.current = window.setTimeout(() => {
//                     if (isOutOfBounds) return gameOver();
//                     setArrivalIndex(willArriveFrom);
//                     setNextSquareToCheckIndex(nextSquare);
//                     setGameBoardArray((prevBoard) => {
//                         const newBoard = [...prevBoard];
//                         newBoard[startingIndex] = { ...newBoard[startingIndex], isActive: true };
//                         return newBoard;
//                     });
//                     setTriggerArrival((prev) => !prev);
//                     setIsPreparationTime(false);
//                 }, SQUARE_TIMER * 1000);
//                 return () => {
//                     if (firstSquareTimerRef.current) {
//                         clearTimeout(firstSquareTimerRef.current);
//                     }
//                 };
//             } else {
//                 gameOver();
//                 return;
//             }
//         }
//     };

//     // Startar timer för att kontrollera nästa ruta.
//     const handleNextSquareTimer = () => {
//         if (
//             nextSquareToCheckIndex !== null &&
//             [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].includes(
//                 nextSquareToCheckIndex
//             )
//         ) {
//             console.log('row150 nextSquareToCheckIndex:', nextSquareToCheckIndex);
//             if (
//                 nextSquareToCheckIndex >= 0 &&
//                 gameBoardArray[nextSquareToCheckIndex].isRevealed &&
//                 gameBoardArray[nextSquareToCheckIndex].tile.connections.includes(true) // kollar om det är en stoppskylt.
//             ) {
//                 squareTimerRef.current = window.setTimeout(() => {
//                     setNumberOfSquaresChecked((prev) => prev + 1);
//                     setGameBoardArray((prevBoard) => {
//                         const newBoard = [...prevBoard];
//                         newBoard[nextSquareToCheckIndex] = { ...newBoard[nextSquareToCheckIndex], isActive: true };
//                         return newBoard;
//                     });
//                 }, SQUARE_TIMER * 1000);
//                 return () => {
//                     if (squareTimerRef.current) {
//                         clearTimeout(squareTimerRef.current);
//                     }
//                 };
//             }
//             gameOver();
//             return;
//         }
//     };

//     const handleConnectionControl = () => {
//         if (nextSquareToCheckIndex !== null && arrivalIndex !== null && numberOfSquaresChecked > 0) {
//             const direction = determineDirection(nextSquareToCheckIndex, arrivalIndex);
//             console.log('direction', direction);
//             const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
//             const isOutOfBounds = checkForOutOfBounds(nextSquareToCheckIndex, direction);
//             const nextSquare = squareToCheck(nextSquareToCheckIndex, direction);
//             console.log('willArriveFrom', willArriveFrom);

//             if (nextSquareToCheckIndex !== endingIndex && isOutOfBounds) {
//                 console.log('nextSquareToCheckIndex:', nextSquareToCheckIndex, 'endingIndex', endingIndex);
//                 console.log('OUT OF BOUNDS!');
//                 gameOver();
//                 return;
//             }
//             console.log('Moving to square:', nextSquare);
//             if (nextSquareToCheckIndex === endingIndex) {
//                 if (direction === finishConnectionIndex) {
//                     console.log('Ny bana bra bra');
//                     setLevel((prev) => prev + 1);
//                     return;
//                 }
//             }

//             setNextSquareToCheckIndex(nextSquare);
//             setArrivalIndex(willArriveFrom);
//             setTriggerArrival((prev) => !prev);
//         }
//     };

//     // Hanterar reset vid klarad bana
//     const handleNextLevel = () => {
//         if (level !== 1) {
//             setPoints((prev) => prev + POINTS_PER_LEVEL * (level - 1));
//             setTotalTime((prev) => prev + BONUS_TIME);
//             setCheckStartConnection(false);
//             const startAndFinishIndex = generateStartAndFinishIndex();
//             const gameBoard = createGameBoardArray();
//             setArrivalIndex(null);
//             setNextSquareToCheckIndex(null);
//             setStartingIndex(startAndFinishIndex.start);
//             setEndingIndex(startAndFinishIndex.finish);
//             setGameBoardArray(gameBoard);
//             setPreparationTime(PREPARATION_TIME);
//             setIsPreparationTime(true);
//         }
//     };

//     const checkForOutOfBounds = (indexOfSquare: number, indexOfDirection: number) => {
//         const noUp = [0, 1, 2, 3, 4];
//         const noRight = [4, 9, 14, 19, 24];
//         const noDown = [20, 21, 22, 23, 24];
//         const noLeft = [0, 5, 10, 15, 20];
//         if (noUp.includes(indexOfSquare) && indexOfDirection === 0) {
//             return true;
//         }
//         if (noRight.includes(indexOfSquare) && indexOfDirection === 1) {
//             return true;
//         }
//         if (noDown.includes(indexOfSquare) && indexOfDirection === 2) {
//             return true;
//         }
//         if (noLeft.includes(indexOfSquare) && indexOfDirection === 3) {
//             return true;
//         }
//         return false;
//     };

//     const determineDirection = (currentSquare: number, arrivedFromIndex: number) => {
//         const determineDirection = gameBoardArray[currentSquare].tile.connections.findIndex(
//             (value, index) => value === true && index !== arrivedFromIndex
//         );
//         return determineDirection;
//     };

//     const squareToCheck = (currentSquare: number, direction: number) => {
//         const nextSquare =
//             direction === 0
//                 ? currentSquare - 5 // Upp
//                 : direction === 1
//                 ? currentSquare + 1 // Höger
//                 : direction === 2
//                 ? currentSquare + 5 // Ned
//                 : currentSquare - 1; // Vänster
//         return nextSquare;
//     };

//     const gameOver = () => {
//         console.log('GAME OVER!');
//         window.ClubHouseGame.setScore(points);
//         setIsGameOver(true);
//         clearTimers();
//         window.ClubHouseGame.gameDone();
//         setIsGameRunning(false);
//         setIsPreparationTime(false);
//         setPreparationTime(PREPARATION_TIME);
//         setStartingIndex(null);
//         setEndingIndex(null);
//         setStartConnectionIndex(null);
//         setCheckStartConnection(false);
//         setNextSquareToCheckIndex(null);
//         setNumberOfSquaresChecked(0);
//         setArrivalIndex(null);
//         setSquaresToSwap();
//     };

//     return null;
// };

// export default GameLoop;
