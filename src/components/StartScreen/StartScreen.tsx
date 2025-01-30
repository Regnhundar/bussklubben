import CTAbutton from '../CTAbutton/CTAbutton';
import './startScreen.css';
interface Props {
    startFunction: () => void;
}
const StartScreen: React.FC<Props> = ({ startFunction }) => {
    // const mainTitle: string[] = ['R', 'o', 'a', 'd', 'B', 'l', 'o', 'X'];
    const subTitle: string[] = ['E', 't', 't', ' ', 'b', 'u', 's', 's', 'i', 'g', 't', ' ', 's', 'p', 'e', 'l', '!'];

    return (
        <main className='start-splash'>
            <svg viewBox='0 0 550 200' className='svg-title'>
                <path id='curve' d='M0,200 C150,80 400,80 550,200' fill='transparent' />

                <defs>
                    <filter id='text-shadow'>
                        <feDropShadow dx='10' dy='8' stdDeviation='1' className='feDropShadow' />
                    </filter>
                </defs>
                <text className='shadow' filter='url(#text-shadow)'>
                    <textPath href='#curve' startOffset='50%' textAnchor='middle'>
                        Roadblox
                    </textPath>
                </text>
                <text className='main'>
                    <textPath href='#curve' startOffset='50%' textAnchor='middle'>
                        Roadblox
                    </textPath>
                </text>
            </svg>
            {/* <h1 className='start-splash__title'>
                {mainTitle.map((letter, i) => (
                    <span key={i} className={`start-splash__title--${i}`}>
                        {letter}
                    </span>
                ))}
            </h1> */}
            <figure className='start-splash__image-wrapper'>
                <img className='start-splash__image' src='./images/busdriver.png' alt='En buss som flyger fram!' />
            </figure>

            <h2 className='start-splash__sub-title'>
                {subTitle.map((letter, i) => (
                    <span key={i} className={`start-splash__sub-title--${i}`}>
                        {letter}
                    </span>
                ))}
            </h2>
            <CTAbutton text='SPELA' onClick={startFunction} modifier='proceed' attention={true} />
        </main>
    );
};

export default StartScreen;
