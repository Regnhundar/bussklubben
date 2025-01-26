interface ClubHouseGameInterface {
    gameDone: () => void;
    gameLoaded: (options: Options) => void;
    gameRunning: () => boolean;
    getScore: () => number;
    registerRestart: (startFunction: () => void) => void;
    setScore: (score: number) => void;
}
interface Options {
    hideInGame: boolean;
}

declare global {
    var ClubHouseGame: ClubHouseGameInterface;
}

export {};
