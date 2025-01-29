import './startScreen.css';
interface Props {
    startFunction: () => void;
}
const StartScreen: React.FC<Props> = ({ startFunction }) => {
    const mainTitle: string[] = ['R', 'o', 'a', 'd', 'B', 'l', 'o', 'x', 'x'];
    const subTitle: string[] = ['E', 't', 't', ' ', 'b', 'u', 's', 's', 'i', 'g', 't', ' ', 's', 'p', 'e', 'l', '!'];

    return (
        <main className='start-splash'>
            <h1 className='start-splash__title'>
                {mainTitle.map((letter, i) => (
                    <span key={i} className={`start-splash__title start-splash__title--${i}`}>
                        {letter}
                    </span>
                ))}
            </h1>
            <figure className='start-splash__image-wrapper'>
                <img className='start-splash__image' src='./images/buss.svg' alt='En buss som flyger fram!' />
            </figure>

            <h2 className='start-splash__sub-title'>
                {subTitle.map((letter, i) => (
                    <span key={i} className={`start-splash__sub-title--${i}`}>
                        {letter}
                    </span>
                ))}
            </h2>
            <button className='start-splash__start-button' onClick={startFunction}>
                STARTA
            </button>
        </main>
    );
};

export default StartScreen;
