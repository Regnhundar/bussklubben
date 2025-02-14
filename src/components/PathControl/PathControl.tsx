import { useEffect } from 'react';
import useGameBoardStore from '../../stores/gameBoardStore';
import { checkForOutOfBounds, determineDirection, squareToCheck } from '../../utils/utilityFunctions';

const PathControl: React.FC = () => {
    const { gameBoardArray, arrivalIndex, startingIndex } = useGameBoardStore();

    useEffect(() => {
        if (startingIndex !== null && arrivalIndex !== null) {
            const isFirstSquareConnected = gameBoardArray[startingIndex].tile.connections[arrivalIndex] === true;

            if (isFirstSquareConnected) {
                // const direction = determineDirection(nextSquareToCheckIndex, arrivalIndex);
                // const willArriveFrom = direction === 0 ? 2 : direction === 2 ? 0 : direction === 1 ? 3 : 1;
                // const isOutOfBounds = checkForOutOfBounds(nextSquareToCheckIndex, direction);
                // const nextSquare = squareToCheck(nextSquareToCheckIndex, direction);
            }

            console.log('Array is changed.');
        }
    }, [gameBoardArray]);

    return null;
};

export default PathControl;
