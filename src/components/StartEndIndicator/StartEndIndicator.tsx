import './startEndIndicator.css';
interface Props {
    type: 'start' | 'finish';
    direction: 'up' | 'down' | 'left' | 'right';
    isRevealed: boolean;
    isConnected?: boolean;
}
const StartEndIndicator: React.FC<Props> = ({
    type = 'start',
    direction = 'down',
    isRevealed = false,
    isConnected,
}) => {
    return isRevealed ? (
        <figure className={`start-and-end start-and-end--${direction}`}>
            <img
                className={`start-and-end__arch start-and-end__arch--${type}`}
                src={type === 'start' ? './images/tunnel-green.svg' : './images/tunnel-yellow.svg'}
            />
            {!isConnected && (
                <>
                    <span
                        className={`start-and-end__arrow start-and-end__arrow--${type} 
                }`}
                    />
                    <span className={`start-and-end__arrow start-and-end__arrow--${type}`} />
                </>
            )}
        </figure>
    ) : (
        <figure
            className={`indicator-sign indicator-sign--${direction} ${
                type === 'start' ? 'indicator-sign--yellow' : 'indicator-sign--green'
            }`}>
            {type === 'start' ? 'START' : 'MÅL'}
        </figure>
    );
};

export default StartEndIndicator;
