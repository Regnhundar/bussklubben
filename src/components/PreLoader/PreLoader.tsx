import { useEffect } from 'react';
interface Props {
    isGameLoaded: boolean;
    setIsGameLoaded: (boolean: boolean) => void;
}
const PreLoader: React.FC<Props> = ({ isGameLoaded, setIsGameLoaded }) => {
    const imagesToPreLoad = [
        './images/roadTiles/downLeft.svg',
        './images/roadTiles/rightDown.svg',
        './images/roadTiles/rightLeft.svg',
        './images/roadTiles/stop.svg',
        './images/roadTiles/upDown.svg',
        './images/roadTiles/upLeft.svg',
        './images/roadTiles/upRight.svg',
        './images/abilities/flash.svg',
        './images/abilities/paus.svg',
        './images/icons/hour-glass.svg',
        './images/icons/star.svg',
        './images/busdriver.png',
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
                .filter((src) => src !== './images/busdriver.png')
                .map((src, index) => (
                    <img key={index} src={src} alt='' />
                ))}
        </div>
    );
};

export default PreLoader;
