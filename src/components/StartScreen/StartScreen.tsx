import './startScreen.css';
interface Props {
    startFunction: () => void;
}
const StartScreen: React.FC<Props> = ({ startFunction }) => {
    return (
        <main className='start-splash'>
            <h1 className='start-splash__title'>RoadBlox</h1>
            <figure className='start-splash__image-wrapper'>
                <img className='start-splash__image' src='./images/buss.svg' alt='En buss som flyger fram!' />
            </figure>

            <h2 className='start-splash__sub-title'>"Ett bussigt spel!"</h2>
            <button className='start-splash__start-button' onClick={startFunction}>
                STARTA
            </button>
        </main>
    );
};

export default StartScreen;
