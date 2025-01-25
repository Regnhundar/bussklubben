//* Tid i sekunder.
// Hur mycket tid man har tills game over när spelet startar.
export const TOTAL_TIME = 30;
// Hur mycket tid man får när man klarat en bana
export const BONUS_TIME = 15;
// Hur mycket tid man har på sig tills bussen åker när bana startar.
export const PREPARATION_TIME = 15;
// Hur lång tid bussen tar per ruta.
export const SQUARE_TIMER = 2;
// Multiplier som appliceras på SQUARE_TIMER när man trycker på turbo knappen. //! 2 * 0.25 = varje ruta tar 0.5 sekunder.
export const TURBO_MULTIPLIER = 0.25;
// Multiplier som appliceras på SQUARE_TIMER när man trycker på lugn knappen.  //! 2 * 2 = varje ruta tar 4 sekunder.
export const SLOW_MULTIPLIER = 2;
// Poäng man får för avklarad bana. Just nu multipliceras POINTS_PER_LEVEL med level. Så bana 2 ger 20poäng.
export const POINTS_PER_LEVEL = 10;
//Poäng per ruta bussen har åkt på
export const POINTS_PER_SQUARE = 1;
// För att se alla brickor från start ändra till true:
export const IS_REVEALED = false;
