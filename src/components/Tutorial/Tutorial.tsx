import "./tutorial.css";
import ConfirmationButton from "../ConfirmationButton/ConfirmationButton";
import MessageOverlay from "../MessageOverlay/MessageOverlay";
import { useState } from "react";
import useGameStore from "../../stores/gameStore";
import { motion } from "motion/react";
import { useSwipeable } from "react-swipeable";

const Tutorial: React.FC = () => {
    const [slideNumber, setSlideNumber] = useState(0);

    const setIsTutorial = useGameStore((state) => state.setIsTutorial);

    const handleNextSlide = () => {
        setSlideNumber((prev) => (prev === tutorialMessages.length - 1 ? 0 : prev + 1));
    };
    const handlePreviousSlide = () => {
        setSlideNumber((prev) => (prev === 0 ? tutorialMessages.length - 1 : prev - 1));
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleNextSlide,
        onSwipedRight: handlePreviousSlide,
        preventScrollOnSwipe: true,
        swipeDuration: 500,
    });

    const tutorialMessages = [
        ["Välkommen till Roadblox!", "Det här är spelbrädet."],
        ["Bakom rutorna finns en väg.", "En buss ska åka på den."],
        ["Byt plats på bitarna så bussen kan åka från start till mål."],
        ["Detta gör knapparna:"],
    ];

    const tutorialImages = [
        {
            src: "/images/tutorial/gameboard.png",
            alt: "Ett spelbräde med 25st kuber med frågetecken på.",
        },
        {
            src: "/images/tutorial/gameboard-revealed.png",
            alt: "Ett spelbräde vars kuber har tagits bort. Istället syns nu 25st vägbitar.",
        },
        {
            src: "/images/tutorial/gameboard-solved.png",
            alt: "Ett spelbräde där vägbitar har lagts så att vägen leder från start till mål.",
        },
    ];

    const abilities = [
        {
            name: "kör",
            description: "Bussen åker direkt.",
            src: "/images/abilities/play.svg",
            alt: "Grön triangel, en play-ikon.",
        },

        {
            name: "snabbt",
            description: "Bussen åker fort.",
            src: "/images/abilities/flash.svg",
            alt: "Gul blixt.",
        },
        {
            name: "sakta",
            description: "Bussen åker sakta.",
            src: "/images/abilities/paus.svg",
            alt: "Gul snigel med grönt skal.",
        },
        {
            name: "byt",
            description: "Byt in den ruta som visas. Tryck sedan på spelbrädet.",
            src: "/images/roadTiles/upDown.svg",
            alt: "Lodrätt vägbit.",
        },
    ];

    return (
        <motion.section initial={{ top: "-200%" }} animate={{ top: 0 }} exit={{ top: "-200%" }} className="tutorial">
            <MessageOverlay textLines={tutorialMessages[slideNumber]} />
            <div {...handlers} className="tutorial__info-wrapper">
                {[0, 1, 2].includes(slideNumber) && (
                    <img
                        key={tutorialImages[slideNumber].src}
                        src={tutorialImages[slideNumber].src}
                        alt={tutorialImages[slideNumber].alt}
                        className="tutorial__gameboard-image"
                    />
                )}

                {slideNumber === 3 && (
                    <ul className="tutorial__list">
                        {abilities.map((ability, i) => (
                            <li key={i} className="tutorial__ability-list-item">
                                <img src={ability.src} alt={ability.alt} className="tutorial__ability-image" />
                                <div className="tutorial__ability-description-wrapper">
                                    <h2 className="tutorial__ability-title">{ability.name.toUpperCase()}</h2>
                                    <p className="tutorial__ability-description">{ability.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="tutorial__navigation-wrapper">
                    <ConfirmationButton
                        type="proceed"
                        icon={{ src: "/images/icons/chevron.svg", alt: "Vit pil som pekar åt vänster." }}
                        extraClass="confirmation-button--tutorial-navigation"
                        onClick={handlePreviousSlide}
                    />
                    <span className="tutorial__pagination-info">{`${slideNumber + 1}/${tutorialMessages.length}`}</span>
                    <ConfirmationButton
                        type="proceed"
                        icon={{ src: "/images/icons/chevron.svg", alt: "Vit pil som pekar åt höger." }}
                        extraClass="confirmation-button--tutorial-navigation"
                        onClick={handleNextSlide}
                    />
                </div>
            </div>

            <ConfirmationButton
                extraClass="confirmation-button--exit-tutorial"
                type={"cancel"}
                textContent="STÄNG"
                onClick={() => setIsTutorial(false)}
            />
        </motion.section>
    );
};

export default Tutorial;
