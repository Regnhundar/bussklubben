export const gameboardVariant = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
};

export const squareButtonVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    show: (customDelay: number) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: customDelay },
    }),
    exit: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

export const jumbotronVariant = {
    hidden: { opacity: 0, y: '-200%' },
    show: {
        opacity: 1,
        y: '0%',
        transition: { duration: 0.4, type: 'spring', bounce: 0.4 },
    },
};
export const levelIndicatorVariant = {
    hidden: { opacity: 0, x: '-50%', y: '-200%' },
    show: {
        opacity: 1,
        y: '0%',
        transition: { delay: 0.3, duration: 0.4, type: 'spring', bounce: 0.4 },
    },
};

export const abilityBarVariant = {
    hidden: { opacity: 0, y: '100%' },
    show: {
        opacity: 1,
        y: '0%',
        transition: { duration: 0.4, type: 'spring', bounce: 0.5 },
    },
};
