import { useEffect } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import { useMemo } from 'react';
import useGameStore from '../../stores/gameStore';

const PathControl: React.FC = () => {
    const {
        gameBoardArray,
        setGameBoardArray,
        arrivalIndex,
        startingIndex,
        startConnectionIndex,
        triggerPath,
        endingIndex,
    } = useGameBoardStore();
    const { isGameOverConfirmation, isGameOver, isGameRunning } = useGameStore();
    // const [nextArrivedFromIndex, setNextArrivedFromIndex] = useState<Connections>();
    // const [nextSquareInLine, setNextSquareInLine] = useState<GameBoardIndices>();

    const isGameStarted = useMemo(() => {
        return (
            isGameRunning &&
            !isGameOver &&
            !isGameOverConfirmation &&
            startingIndex !== null &&
            startConnectionIndex !== null &&
            arrivalIndex !== null
        );
    }, [isGameRunning, isGameOver, isGameOverConfirmation, startingIndex, startConnectionIndex, arrivalIndex]);

    const isFirstSquareConnected = useMemo(() => {
        return isGameStarted
            ? gameBoardArray[startingIndex!].isRevealed &&
                  gameBoardArray[startingIndex!].tile.connections[startConnectionIndex!] === true
            : false;
    }, [isGameStarted, gameBoardArray]);

    // VARNING! PROMPT ENGINEERING (>_<) FÖLJER:

    useEffect(() => {
        if (!isGameStarted) return;
        if (isFirstSquareConnected && startingIndex !== null) {
            let gridColumns = 5;
            let gridRows = 5;
            // To track changes and prevent infinite loop
            const updatedGameBoardArray = [...gameBoardArray];
            let updated = false; // Flag to track if any square has changed

            const queue: number[] = [startingIndex]; // BFS queue
            const visited = new Set<number>(); // Set of visited squares

            // Helper function to get the adjacent tile index based on direction
            const getAdjacentIndex = (index: number, direction: number): number | null => {
                const row = Math.floor(index / gridColumns);
                const col = index % gridColumns;

                switch (direction) {
                    case 0:
                        return row > 0 ? index - gridColumns : null; // Up
                    case 1:
                        return col < gridColumns - 1 ? index + 1 : null; // Right
                    case 2:
                        return row < gridRows - 1 ? index + gridColumns : null; // Down
                    case 3:
                        return col > 0 ? index - 1 : null; // Left
                    default:
                        return null;
                }
            };

            // Reset all squares before calculating connected squares
            updatedGameBoardArray.forEach((tile) => (tile.isLinkedToStart = false));

            while (queue.length > 0) {
                const currentIndex = queue.shift()!;

                if (visited.has(currentIndex)) continue;
                visited.add(currentIndex);

                if (currentIndex === endingIndex) {
                    // updatedGameBoardArray[currentIndex].isLinkedToStart = true;
                    // updated = true;
                    continue; // Stop further expansion beyond this square
                }

                // If `isLinkedToStart` is false, update it and mark it as modified
                if (
                    !updatedGameBoardArray[currentIndex].isLinkedToStart &&
                    updatedGameBoardArray[currentIndex].isRevealed
                ) {
                    updatedGameBoardArray[currentIndex].isLinkedToStart = true;
                    updated = true;
                }

                // Get the current tile's connection array
                const currentConnections = updatedGameBoardArray[currentIndex].tile.connections;

                currentConnections.forEach((canMove, direction) => {
                    if (!canMove) return; // Skip if no connection in this direction

                    const adjacentIndex = getAdjacentIndex(currentIndex, direction);
                    if (adjacentIndex === null || visited.has(adjacentIndex)) return;

                    const oppositeDirection = (direction + 2) % 4; // Get opposite direction (0 ↔ 2, 1 ↔ 3)

                    if (adjacentIndex === endingIndex) {
                        if (
                            updatedGameBoardArray[adjacentIndex].isRevealed &&
                            updatedGameBoardArray[adjacentIndex].tile.connections[oppositeDirection]
                        ) {
                            updatedGameBoardArray[adjacentIndex].isLinkedToStart = true;
                            updated = true;
                        }
                        return; // Do NOT expand past endingIndex
                    }
                    if (
                        updatedGameBoardArray[adjacentIndex].isRevealed &&
                        updatedGameBoardArray[adjacentIndex].tile.connections[oppositeDirection]
                    ) {
                        queue.push(adjacentIndex);
                    }
                });
            }

            // Update the game board only if changes were made
            if (updated) {
                setGameBoardArray(updatedGameBoardArray);
            }
        } else {
            const disconnectedGameBoard = gameBoardArray.map((gameSquare) => ({
                ...gameSquare,
                isLinkedToStart: false,
            }));
            setGameBoardArray(disconnectedGameBoard);
        }
    }, [triggerPath, isFirstSquareConnected]);

    return null;

    // const isSquareConnected =
    //     typeof nextSquareInLine === 'number' &&
    //     typeof nextArrivedFromIndex === 'number' &&
    //     gameBoardArray[nextArrivedFromIndex].isRevealed &&
    //     gameBoardArray[nextArrivedFromIndex].tile.connections[nextArrivedFromIndex] === true;

    // useEffect(() => {
    //     if (isGameStarted && isFirstSquareConnected) {
    //         setNextSquareInLine(startingIndex);
    //         setNextArrivedFromIndex(startConnectionIndex);

    //         console.log('Checking connection');
    //     }
    // }, [nextSquareInLine, gameBoardArray]);

    // useEffect(() => {
    //     if (nextSquareInLine !== undefined && nextArrivedFromIndex !== undefined) {
    //         checkForConnection(nextSquareInLine, nextArrivedFromIndex);
    //     }
    // }, [nextArrivedFromIndex, nextSquareInLine]);

    // const checkForConnection = (squareIndex: GameBoardIndices, arrivedFrom: Connections) => {
    //     const direction = determineDirection(squareIndex, arrivedFrom);
    //     const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
    //     setNextArrivedFromIndex(willArriveFrom);
    //     const nextSquare = squareToCheck(squareIndex, direction);
    //     if (!validGameBoardIndices.includes(nextSquare)) {
    //         console.log('Invalid index.');
    //         return;
    //     }
    //     setNextSquareInLine(nextSquare);
    //     const isOutOfBounds = checkForOutOfBounds(nextSquare, direction);
    //     if (isOutOfBounds) {
    //         console.log('isOutOfBounds.');
    //         return;
    //     }

    //     if (!isSquareConnected) {
    //         console.log(nextSquare, 'Not connected.');
    //         return;
    //     }

    //     updateGameSquare(nextSquare, { isLinkedToStart: true });
    // };

    // useEffect(() => {
    //     if (isGameStarted && !isFirstSquareConnected) {
    //         const disconnectedGameBoard = gameBoardArray.map((gameSquare) => ({
    //             ...gameSquare,
    //             isLinkedToStart: false,
    //         }));
    //         setGameBoardArray(disconnectedGameBoard);
    //         console.log('disconnecting');
    //     }
    // }, [isFirstSquareConnected]);
};

export default PathControl;
