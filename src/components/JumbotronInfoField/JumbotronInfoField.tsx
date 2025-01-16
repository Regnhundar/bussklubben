import './jumbotronInfoField.css';
interface Props {
    variable: number;
    unit: string;
    src: string;
}
const JumbotronInfoField: React.FC<Props> = ({ variable, unit, src }) => {
    return (
        <figure className='jumbotron-info-field'>
            <img className='jumbotron-info-field__icon' src={src} alt='' />
            <div className='jumbotron-info-field__wrapper'>
                <h2 className='jumbotron-info-field__data'>{variable}</h2>
                <h3 className='jumbotron-info-field__unit-info'>{unit}</h3>
            </div>
        </figure>
    );
};

export default JumbotronInfoField;
