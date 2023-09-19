import { Link } from 'react-router-dom';
import './notFound.css';
import Layout from '../../components/layout';

const NotFound = () => {
    return (
        <>
            <section className='mx-[7.5%] bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-center min-h-screen'>
                <div>
                    <div className="m-auto sadIcon xl:h-52 xl:w-52 h-20 w-20 overflow-hidden">
                        <img className='w-full object-cover ' src="/src/assets/icons/sadFile.svg" alt="" />
                    </div>
                    <div className='mb-4 text-xl sm:text-3xl xl:text-6xl font-semibold  text-[#938f97] '>Oops! No Information available</div>
                    <Link to={'/'} className='text-[#a785ff] text-lg sm:text-xl xl:text-4xl underline'>GO HOME</Link>
                </div>
            </section>
        </>
    )
}

export default NotFound;

