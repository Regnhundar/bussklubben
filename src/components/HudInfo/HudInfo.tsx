import './hudInfo.css';
interface Props {
    variable: number;
    unit: string;
    src: string;
}
const HudInfo: React.FC<Props> = ({ variable, unit, src }) => {
    return (
        <figure className='hudinfo'>
            <img className='hudinfo__icon' src={src} alt='' />
            <div className='hudinfo__info'>
                <h2 className='hudinfo__data'>{variable}</h2>
                <h3 className='hudinfo__unit-info'>{unit}</h3>
            </div>
        </figure>
    );
};

export default HudInfo;
