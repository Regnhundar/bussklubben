import { useEffect, useRef, useState } from "react";
import useGameBoardStore from "../../stores/gameBoardStore";
import GameSquare from "../GameSquare/GameSquare";
import { createGameBoardArray, endPoints, generateStartAndFinishIndex } from "../../utils/utilityFunctions";
import "./gameBoard.css";
import { motion } from "motion/react";
import { gameboardVariant } from "../../motionVariants/variants";
import Bus from "../Bus/Bus";
import useGameStore from "../../stores/gameStore";
import { GRID_COLUMNS, GRID_ROWS } from "../../constants";
import { useShallow } from "zustand/shallow";
// import { testGameBoard1 } from '../../data/roadTiles';

interface Props {
    isFirstSquareConnected: boolean;
    isSquareConnected: boolean;
}
const GameBoard: React.FC<Props> = ({ isFirstSquareConnected, isSquareConnected }) => {
    const {
        gameBoardArray,
        setGameBoardArray,
        setStartingIndex,
        setEndingIndex,
        startingIndex,
        endingIndex,
        finishConnectionIndex,
        setStartConnectionIndex,
        setFinishConnectionIndex,
        setNextSquareToCheckIndex,
        setArrivalIndex,
        nextSquareToCheckIndex,
        isExiting,
    } = useGameBoardStore(
        useShallow((state) => ({
            gameBoardArray: state.gameBoardArray,
            setGameBoardArray: state.setGameBoardArray,
            setStartingIndex: state.setStartingIndex,
            setEndingIndex: state.setEndingIndex,
            startingIndex: state.startingIndex,
            endingIndex: state.endingIndex,
            finishConnectionIndex: state.finishConnectionIndex,
            setStartConnectionIndex: state.setStartConnectionIndex,
            setFinishConnectionIndex: state.setFinishConnectionIndex,
            setNextSquareToCheckIndex: state.setNextSquareToCheckIndex,
            setArrivalIndex: state.setArrivalIndex,
            nextSquareToCheckIndex: state.nextSquareToCheckIndex,
            isExiting: state.isExiting,
        }))
    );
    const { level, isGameOverConfirmation } = useGameStore(
        useShallow((state) => ({
            level: state.level,
            isGameOverConfirmation: state.isGameOverConfirmation,
        }))
    );

    const [startingArrowDirection, setStartingArrowDirection] = useState<"down" | "up" | "left" | "right">("down");
    const [finishArrowDirection, setFinishArrowDirection] = useState<"down" | "up" | "left" | "right">("down");

    const gameBoardRef = useRef<HTMLElement | null>(null);

    const [squareSize, setSquareSize] = useState(0);
    const [coordinates, setCoordinates] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });

    const upOrDownRef = useRef<string>("");
    const leftOrRightRef = useRef<string>("");
    const directionRef = useRef<string>("");

    useEffect(() => {
        const startAndFinishIndex = generateStartAndFinishIndex();
        const gameBoard = createGameBoardArray();
        setStartingIndex(startAndFinishIndex.start);
        setEndingIndex(startAndFinishIndex.finish);
        setGameBoardArray(gameBoard);

        const updateSquareSize = () => {
            if (gameBoardRef.current) {
                const boardWidth = gameBoardRef.current.clientWidth;
                const boardHeight = gameBoardRef.current.clientHeight;
                const newSquareSize = Math.min(boardWidth / GRID_COLUMNS, boardHeight / GRID_ROWS);
                setSquareSize(newSquareSize);
            }
        };

        updateSquareSize();
        window.addEventListener("resize", updateSquareSize);
        return () => window.removeEventListener("resize", updateSquareSize);
    }, []);

    useEffect(() => {
        if (startingIndex !== null) {
            const startEndpoint = endPoints(startingIndex);

            switch (startEndpoint.arrowDirection) {
                case "up":
                    upOrDownRef.current = "up";
                    directionRef.current = "vertical";
                    break;
                case "down":
                    upOrDownRef.current = "down";
                    directionRef.current = "vertical";
                    break;
                case "right":
                    leftOrRightRef.current = "left";
                    directionRef.current = "horizontal";
                    break;
                default:
                    leftOrRightRef.current = "right";
                    directionRef.current = "horizontal";
            }

            setNextSquareToCheckIndex(startingIndex);
            setStartingArrowDirection(startEndpoint.arrowDirection);
            setArrivalIndex(startEndpoint.successConnection);
            setStartConnectionIndex(startEndpoint.successConnection);
        }
        if (endingIndex !== null) {
            const finishEndpoint = endPoints(endingIndex);
            setFinishArrowDirection(finishEndpoint.arrowDirection);
            setFinishConnectionIndex(finishEndpoint.successConnection);
        }
    }, [startingIndex, endingIndex]);

    useEffect(() => {
        let isMounted = true;
        if (
            nextSquareToCheckIndex !== null &&
            startingIndex !== null &&
            endingIndex !== null &&
            squareSize > 0 &&
            isSquareConnected
        ) {
            const y = Math.floor(nextSquareToCheckIndex / GRID_ROWS) * squareSize;
            const x = (nextSquareToCheckIndex % GRID_COLUMNS) * squareSize;

            if (
                coordinates.y !== null &&
                coordinates.x !== null &&
                nextSquareToCheckIndex !== startingIndex &&
                !isExiting
            ) {
                if (y < coordinates.y) {
                    upOrDownRef.current = "down";
                    directionRef.current = "vertical";
                }
                if (y > coordinates.y) {
                    upOrDownRef.current = "up";
                    directionRef.current = "vertical";
                }

                if (x > coordinates.x) {
                    leftOrRightRef.current = "right";
                    directionRef.current = "horizontal";
                }
                if (x < coordinates.x) {
                    leftOrRightRef.current = "left";
                    directionRef.current = "horizontal";
                }
            }
            if (isExiting) {
                switch (finishConnectionIndex) {
                    case 0:
                        upOrDownRef.current = "down";
                        directionRef.current = "vertical";
                        break;
                    case 2:
                        upOrDownRef.current = "up";
                        directionRef.current = "vertical";
                        break;
                    case 1:
                        leftOrRightRef.current = "right";
                        directionRef.current = "horizontal";
                        break;
                    default:
                        leftOrRightRef.current = "left";
                        directionRef.current = "horizontal";
                }
            }
            if (isMounted) {
                setCoordinates({ x, y });
            }
        }

        return () => {
            isMounted = false;
        };
    }, [nextSquareToCheckIndex, isExiting, isSquareConnected]);

    return (
        <>
            <motion.section
                ref={(el) => (gameBoardRef.current = el)}
                variants={gameboardVariant}
                initial="hidden"
                animate="show"
                exit="hidden"
                key={level}
                className={isGameOverConfirmation ? "game-board game-board--disabled" : "game-board"}>
                {coordinates.x !== null && coordinates.y !== null && isFirstSquareConnected && (
                    <Bus
                        x={coordinates.x}
                        y={coordinates.y}
                        upOrDown={upOrDownRef.current}
                        leftOrRight={leftOrRightRef.current}
                        direction={directionRef.current}
                        squareSize={squareSize}
                    />
                )}
                {gameBoardArray.map((squareData, i) => (
                    <GameSquare
                        key={i}
                        squareData={squareData}
                        index={i}
                        startingIndicator={startingArrowDirection}
                        finishIndicator={finishArrowDirection}
                    />
                ))}
            </motion.section>
        </>
    );
};

export default GameBoard;
