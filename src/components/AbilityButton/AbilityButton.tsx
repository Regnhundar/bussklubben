import './abilityButton.css';
const AbilityButton: React.FC = () => {
    return (
        <div className='ability'>
            <button className='ability__button'>
                <img src='./images/roadTiles/vertical.svg' alt='vertikal vägbit' className='ability-button__image' />
            </button>
            <h3 className='ability-button__name'>BYT</h3>
        </div>
    );
};

export default AbilityButton;
