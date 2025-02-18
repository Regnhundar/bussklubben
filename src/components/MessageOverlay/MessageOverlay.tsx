import './messageOverlay.css';
const MessageOverlay: React.FC = () => {
    return (
        <article className='message-overlay'>
            <h2 className='message-overlay__title'>GAME OVER:</h2>
            <h3 className='message-overlay__title'>Slut på tid!</h3>
            <img
                src='../../../public/images/busdriver-head.png'
                alt='En busschafför med mustasch och hatt.'
                className='message-overlay__driver-image'
            />
        </article>
    );
};

export default MessageOverlay;
