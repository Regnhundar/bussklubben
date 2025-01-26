// Gömmer clubhouse poängräkning under spelets gång då egen räkning visas.
export const hidePoints = () => {
    window.ClubHouseGame.gameLoaded({ hideInGame: true });
};
// Gömmer clubhouse poängräkning under spelets gång då egen räkning visas.
export const functionToStartGame = (startFunction: () => void) => {
    window.ClubHouseGame.registerRestart(startFunction);
};

export const sendScore = (score: number) => {
    window.ClubHouseGame.setScore(score);
};
