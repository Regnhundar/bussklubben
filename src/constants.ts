//* Tid i sekunder.
// Hur mycket tid man har tills game over när spelet startar.
export const TOTAL_TIME = 2000;
// Hur mycket tid man får när man klarat en bana
export const BONUS_TIME = 10;
// Hur mycket tid man har på sig tills bussen åker när bana startar.
export const PREPARATION_TIME = 10;
// Hur lång tid bussen tar per ruta.
export const SQUARE_TIMER = 2000;
// Multiplier som appliceras på SQUARE_TIMER när man trycker på turbo knappen. //! 2 * 0.25 = varje ruta tar 0.5 sekunder under turbo.
export const TURBO_MULTIPLIER = 0.1;
// Multiplier som appliceras på SQUARE_TIMER när man trycker på lugn knappen.  //! 2 * 1.5 = varje ruta tar 3 sekunder när under lugnt.
export const SLOW_MULTIPLIER = 1.5;
// Poäng man får för avklarad bana.
export const POINTS_PER_LEVEL = 10;
//Poäng per ruta bussen har åkt på
export const POINTS_PER_SQUARE = 1;
// För att se alla brickor från start ändra till true:
export const IS_REVEALED = false;
// Hur länge man visar meddelande vid game over, ny bana.
export const TOAST_TIME = 4;

// Hur mycket tid man har tills game over när spelet startar.
// export const TOTAL_TIME = 30;
// // Hur mycket tid man får när man klarat en bana
// export const BONUS_TIME = 10;
// // Hur mycket tid man har på sig tills bussen åker när bana startar.
// export const PREPARATION_TIME = 25;
// // Hur lång tid bussen tar per ruta.
// export const SQUARE_TIMER = 3;
// // Multiplier som appliceras på SQUARE_TIMER när man trycker på turbo knappen. //! 2 * 0.25 = varje ruta tar 0.5 sekunder under turbo.
// export const TURBO_MULTIPLIER = 0.1;
// // Multiplier som appliceras på SQUARE_TIMER när man trycker på lugn knappen.  //! 2 * 1.5 = varje ruta tar 3 sekunder när under lugnt.
// export const SLOW_MULTIPLIER = 1.5;
// // Poäng man får för avklarad bana.
// export const POINTS_PER_LEVEL = 10;
// //Poäng per ruta bussen har åkt på
// export const POINTS_PER_SQUARE = 1;
// // För att se alla brickor från start ändra till true:
// export const IS_REVEALED = false;
// // Hur länge man visar meddelande vid game over, ny bana.
// export const TOAST_TIME = 3;
