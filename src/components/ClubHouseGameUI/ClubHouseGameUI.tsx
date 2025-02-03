import { useEffect } from 'react';
import './clubHouseGameUI.css';
interface Props {
    startGame: () => void;
}
const ClubHouseGameUI: React.FC<Props> = ({ startGame }) => {
    useEffect(() => {
        window.ClubHouseGame.registerRestart(startGame);
    }, []);

    return (
        <>
            <div id='ui'></div>
            <div className='loader' id='loader'>
                <p className='loader-text'>Startar</p>
                <img className='loader-logo' src='/images/logo.png' />
                <img className='spinner' src='/images/spinner.svg' />
            </div>
        </>
    );
};

export default ClubHouseGameUI;
