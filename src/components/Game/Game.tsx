import './game.css';
import { motion } from 'motion/react';
import MessageOverlay from '../MessageOverlay/MessageOverlay';
import Jumbotron from '../Jumbotron/Jumbotron';
import GameBoard from '../GameBoard/GameBoard';
import AbilityBar from '../AbilityBar/AbilityBar';
import PathControl from '../PathControl/PathControl';
import GameLoop from '../GameLoop/GameLoop';

import useGameStore from '../../stores/gameStore';
import { useMemo } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
const Game: React.FC = () => {
    const { isGameOverConfirmation, setIsGameOver, setIsGameOverConfirmation, points, totalTime } = useGameStore();
    const {
        startingIndex,
        setStartingIndex,
        startConnectionIndex,
        setEndingIndex,
        nextSquareToCheckIndex,
        arrivalIndex,
        gameBoardArray,
    } = useGameBoardStore();

    const isFirstSquareConnected = useMemo(() => {
        if (typeof startingIndex !== 'number' || typeof startConnectionIndex !== 'number') return false;
        const square = gameBoardArray[startingIndex];
        return square?.isRevealed && square.tile.connections[startConnectionIndex] === true;
    }, [gameBoardArray, startingIndex, startConnectionIndex]);

    const isSquareConnected = useMemo(() => {
        if (typeof nextSquareToCheckIndex !== 'number' || typeof arrivalIndex !== 'number') return false;
        const square = gameBoardArray[nextSquareToCheckIndex];
        return square?.isRevealed && square.tile.connections[arrivalIndex] === true;
    }, [gameBoardArray, nextSquareToCheckIndex, arrivalIndex]);

    const handleConfirmation = () => {
        setIsGameOver(true);
        setStartingIndex(null);
        setEndingIndex(null);
        setIsGameOverConfirmation(false);
        window.ClubHouseGame.setScore(points);
        window.ClubHouseGame.gameDone();
    };

    const handleGameOverMessage = (): string[] => {
        const messages = ['Åh nej...'];
        if (totalTime === 0) {
            messages.push('Tiden tog slut!');
            return messages;
        }
        if (!isFirstSquareConnected) {
            messages.push('Start var fel!');
            return messages;
        }
        messages.push('Där var vägen slut!');
        return messages;
    };

    return (
        <motion.main exit={{ opacity: 0 }} className='game'>
            {isGameOverConfirmation ? (
                <MessageOverlay textLines={handleGameOverMessage()} onClick={handleConfirmation} />
            ) : (
                <Jumbotron />
            )}
            <GameBoard isFirstSquareConnected={isFirstSquareConnected} isSquareConnected={isSquareConnected} />
            <AbilityBar />
            <PathControl />
            <GameLoop isSquareConnected={isSquareConnected} />
        </motion.main>
    );
};

export default Game;
