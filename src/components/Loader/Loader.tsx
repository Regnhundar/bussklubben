import './loader.css';
const Loader: React.FC = () => {
    return (
        <article className='loader'>
            <h1 className='loader__graphic'>
                Loading
                <span className='loader__graphic loader__graphic--dot1'>.</span>
                <span className='loader__graphic loader__graphic--dot2'>.</span>
                <span className='loader__graphic loader__graphic--dot3'>.</span>
            </h1>
        </article>
    );
};

export default Loader;
