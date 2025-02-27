import { useEffect } from 'react';

import useGameStore from '../../stores/gameStore';

interface Props {
    isGameLoaded: boolean;
    setIsGameLoaded: (boolean: boolean) => void;
}
const PreLoader: React.FC<Props> = ({ isGameLoaded, setIsGameLoaded }) => {
    const { setIsTutorial } = useGameStore();
    const imagesToPreLoad = [
        `${import.meta.env.BASE_URL}images/roadTiles/downLeft.svg`,
        `${import.meta.env.BASE_URL}images/roadTiles/rightDown.svg`,
        `${import.meta.env.BASE_URL}images/roadTiles/rightLeft.svg`,
        `${import.meta.env.BASE_URL}images/roadTiles/stop.svg`,
        `${import.meta.env.BASE_URL}images/roadTiles/upDown.svg`,
        `${import.meta.env.BASE_URL}images/roadTiles/upLeft.svg`,
        `${import.meta.env.BASE_URL}images/roadTiles/upRight.svg`,
        `${import.meta.env.BASE_URL}images/abilities/flash.svg`,
        `${import.meta.env.BASE_URL}images/abilities/paus.svg`,
        `${import.meta.env.BASE_URL}images/abilities/play.svg`,
        `${import.meta.env.BASE_URL}images/icons/hour-glass.svg`,
        `${import.meta.env.BASE_URL}images/icons/star.svg`,
        `${import.meta.env.BASE_URL}images/logo.png`,
        `${import.meta.env.BASE_URL}images/busdriver-head.png`,
        `${import.meta.env.BASE_URL}images/bus.svg`,
        `${import.meta.env.BASE_URL}images/bus-slow.svg`,
        `${import.meta.env.BASE_URL}images/bus-turbo.svg`,
        `${import.meta.env.BASE_URL}images/tunnel-green.svg`,
        `${import.meta.env.BASE_URL}images/tunnel-yellow.svg`,
        `${import.meta.env.BASE_URL}images/questionmark.svg`,
        `${import.meta.env.BASE_URL}images/tutorial/gameboard.png`,
        `${import.meta.env.BASE_URL}images/tutorial/gameboard-revealed.png`,
        `${import.meta.env.BASE_URL}images/tutorial/gameboard-solved.png`,
    ];

    const preloadImages = async (imagePaths: string[]) => {
        try {
            await Promise.all(
                imagePaths.map((src) => {
                    return new Promise<void>((resolve) => {
                        const img = new Image();
                        img.src = src;
                        img.onload = () => resolve();
                        img.onerror = () => {
                            console.error(`Kunde inte ladda in bild: ${src}`);
                            resolve();
                        };
                    });
                })
            );
        } catch (error) {
            console.error('Fel i preloadImages:', error);
        }
    };

    useEffect(() => {
        if (!isGameLoaded) {
            preloadImages(imagesToPreLoad).then(() => {
                setIsGameLoaded(true);
                const isFirstTimePlaying = localStorage.getItem('isFirstTimePlaying');
                const parsedIsFirstTimePlaying = isFirstTimePlaying !== null ? JSON.parse(isFirstTimePlaying) : '';
                if (parsedIsFirstTimePlaying !== false) {
                    setIsTutorial(true);
                    localStorage.setItem('isFirstTimePlaying', 'false');
                }
            });
        }

        if (isGameLoaded) {
            const checkLoader = setInterval(() => {
                if (document.getElementById('loader')) {
                    clearInterval(checkLoader);
                    window.ClubHouseGame.gameLoaded({ hideInGame: true });
                }
            }, 100);

            return () => clearInterval(checkLoader);
        }
    }, [isGameLoaded]);

    return (
        //För att förhindra att react städar bort bilderna ur minnet läggs de i DOM. Annars måste de hämtas igen när de ska renderas på spelbrädet.
        <div style={{ display: 'none' }} aria-hidden={'true'}>
            {imagesToPreLoad
                .filter((src) => src !== `${import.meta.env.BASE_URL}images/logo.png`)
                .map((src, index) => (
                    <img key={index} src={src} alt='' />
                ))}
        </div>
    );
};

export default PreLoader;
