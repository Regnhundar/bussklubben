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
        `${import.meta.env.BASE_URL}images/busdriver.png`,
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
        await document.fonts.load('1rem Kong');
        await document.fonts.load('1rem Silvertones');
    };

    useEffect(() => {
        if (!isGameLoaded) {
            Promise.all([loadFonts(), preloadImages(imagesToPreLoad)]).then(() => {
                setIsGameLoaded(true);
                console.log('Images loaded.');
            });
        }
    }, [isGameLoaded]);

    return (
        //För att förhindra att react städar bort bilderna ur minnet läggs de i DOM. Annars måste de hämtas igen när de ska renderas på spelbrädet.
        <div style={{ display: 'none' }}>
            {imagesToPreLoad
                .filter((src) => src !== `${import.meta.env.BASE_URL}images/busdriver.png`)
                .map((src, index) => (
                    <img key={index} src={src} alt='' />
                ))}
        </div>
    );
};

export default PreLoader;
