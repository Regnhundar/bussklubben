export const squareButtonVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    show: (customDelay: number) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: customDelay },
    }),
    exit: {
        scale: 0,
        transition: { duration: 0.5, ease: 'easinOut' },
    },
};
export const squareImgVariant = {
    hidden: { opacity: 0.7, scale: 0.9 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2 },
    },
};
