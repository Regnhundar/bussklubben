import { useState } from 'react';
import { POINTS_PER_LEVEL, POINTS_PER_SQUARE } from '../../constants';
import CTAbutton from '../CTAbutton/CTAbutton';
import './inforOverlay.css';
import { AnimatePresence, motion } from 'motion/react';

interface Props {
    func: () => void;
}
const InfoOverlay: React.FC<Props> = ({ func }) => {
    const [isFeedback, setIsFeedback] = useState<boolean>(false);
    return (
        <motion.article
            className='info-overlay'
            key={'info-overlay'}
            initial={{ translateY: '-50%', opacity: 0 }}
            exit={{ translateY: '-50%', opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}>
            <AnimatePresence mode='wait'>
                {!isFeedback ? (
                    <motion.div
                        key={'info-game-rules'}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className='info-overlay__inner-wrapper'>
                        <ul className='info-overlay__list'>
                            <h2 className='info-overlay__title'>SPELREGLER:</h2>
                            <p className='info-overlay__paragraph'>
                                Koppla vägen från{' '}
                                <span className='info-overlay__paragraph info-overlay__paragraph--start'>START</span>{' '}
                                till{' '}
                                <span className='info-overlay__paragraph info-overlay__paragraph--finish'>MÅL</span>{' '}
                                innan "bussen" får slut på väg eller tiden tar slut.
                            </p>
                            <li className='info-overlay__list-item'>Klicka på ruta för att se vad som ligger bakom.</li>
                            <li className='info-overlay__list-item'>
                                Byt plats på vägbitar genom att klicka på två som är synliga.
                            </li>
                            <li className='info-overlay__list-item'>
                                Startrutan måste vara korrekt kopplad när timer för avgång har räknat ned.
                            </li>
                            <li className='info-overlay__list-item'>
                                {`Du får ${POINTS_PER_SQUARE} poäng per ruta du åkt på och ${POINTS_PER_LEVEL} för varje bana du klarar.`}
                            </li>
                        </ul>

                        <ol className='info-overlay__ability-list'>
                            <h3 className='info-overlay__subtitle'>Du har tre färdigheter:</h3>
                            <li className='info-overlay__ability-list-item'>
                                <span className='info-overlay__ability-list-item info-overlay__ability-list-item--ability-name'>
                                    BYT:
                                </span>{' '}
                                Aktivera för att byta en synlig ruta till den som visas på knappen.
                            </li>
                            <li className='info-overlay__ability-list-item'>
                                <span className='info-overlay__ability-list-item info-overlay__ability-list-item--ability-name'>
                                    LUGN:
                                </span>{' '}
                                Bussen kommer åka 50% långsammare tills nästa hållplats startar.
                            </li>
                            <li className='info-overlay__ability-list-item'>
                                <span className='info-overlay__ability-list-item info-overlay__ability-list-item--ability-name'>
                                    TURBO/KÖR:
                                </span>{' '}
                                Bussen åker i rasande fart tills nästa hållplats startar. Kan också aktiveras för att
                                åka direkt under avgångs-timern.
                            </li>
                        </ol>
                    </motion.div>
                ) : (
                    <motion.div
                        key={'info-feedback'}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className='info-overlay__feedback-wrapper'>
                        <h2 className='info-overlay__title'>FEEDBACK:</h2>
                        <p className='info-overlay__paragraph'>Hallå testpilot!</p>
                        <p className='info-overlay__paragraph'>
                            Har du hittat en bugg? Har du en idé på någon förbättring? Vore jätteglad om du kunde
                            berätta det för mig(Magnus)!
                        </p>
                        <p className='info-overlay__paragraph'>
                            Du är mer än välkommen att komma och prata med mig direkt eller maila till:{' '}
                            <a
                                href='mailto:regnhundar@gmail.com?subject=Feedback%20Roadblox!'
                                className='info-overlay__mail'>
                                regnhundar@gmail.com
                            </a>
                        </p>

                        <h3 className='info-overlay__subtitle info-overlay__subtitle--feedback'>Arbetar bla på:</h3>
                        <ul className='info-overlay__feedback-list'>
                            <li className='info-overlay__feedback-list-item'>
                                En bugg som gör att "bussen" inte startar igen när man klarat en bana. Svår att
                                återskapa!
                            </li>
                            <li className='info-overlay__feedback-list-item'>
                                En passande buss som är på spelbrädet istället för blinkande/färgade rutor.
                            </li>
                            <li className='info-overlay__feedback-list-item'>Bättre övergångar på animationer.</li>
                            <li className='info-overlay__feedback-list-item'>
                                Tydligare hur man ska koppla start/mål rutorna.
                            </li>
                            <li className='info-overlay__feedback-list-item'>
                                Bilder istället för text om spelregler.
                            </li>
                            <li className='info-overlay__feedback-list-item'>Bättre "game over" vy.</li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='info-overlay__button-wrapper'>
                <CTAbutton text='stäng' modifier='cancel' onClick={func} />
                <CTAbutton
                    text={!isFeedback ? 'feedback' : 'spelregler'}
                    modifier='info'
                    onClick={() => setIsFeedback((prev) => !prev)}
                />
            </div>
        </motion.article>
    );
};

export default InfoOverlay;
