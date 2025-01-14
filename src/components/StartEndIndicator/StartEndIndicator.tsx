import './startEndIndicator.css';
interface Props {
    type: 'start' | 'finish';
    direction: 'up' | 'down' | 'left' | 'right';
}
const StartEndIndicator: React.FC<Props> = ({ type = 'start', direction = 'down' }) => {
    return (
        <figure
            className={`indicator-sign indicator-sign--${direction} ${
                type === 'start' ? 'indicator-sign--yellow' : 'indicator-sign--green'
            }`}>
            {type === 'start' ? 'START' : 'MÅL'}
        </figure>
    );
};

export default StartEndIndicator;
