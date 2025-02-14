import { useEffect } from 'react';

interface Props {
    isGameLoaded: boolean;
    setIsGameLoaded: (boolean: boolean) => void;
}
const PreLoader: React.FC<Props> = ({ isGameLoaded, setIsGameLoaded }) => {
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
        `${import.meta.env.BASE_URL}images/icons/hour-glass.svg`,
        `${import.meta.env.BASE_URL}images/icons/star.svg`,
        `${import.meta.env.BASE_URL}images/logo.png`,
        `${import.meta.env.BASE_URL}images/bus.svg`,
        `${import.meta.env.BASE_URL}images/bus-slow.svg`,
        `${import.meta.env.BASE_URL}images/bus-turbo.svg`,
        `${import.meta.env.BASE_URL}images/tunnel-green.svg`,
        `${import.meta.env.BASE_URL}images/tunnel-yellow.svg`,
    ];

    const preloadImages = (imagePaths: string[]) => {
        return Promise.all(
            imagePaths.map((src) => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve();
                    img.onerror = reject;
                });
            })
        );
    };

    const loadFonts = async () => {
        await document.fonts.ready;
    };

    useEffect(() => {
        if (!isGameLoaded) {
            Promise.all([loadFonts(), preloadImages(imagesToPreLoad)]).then(() => {
                setIsGameLoaded(true);
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
