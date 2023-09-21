import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <section className='mx-[7.5%] bg-[#ffffff1a] flex items-center justify-center text-center py-40 '>
                <div>
                    <div className="m-auto sadIcon xl:h-52 xl:w-52 h-20 w-20 overflow-hidden">
                        <img className='w-full object-cover ' src="/assets/icons/sadFile.svg" alt="" />
                    </div>
                    <div className='mb-4 text-lg sm:text-3xl xl:text-6xl font-semibold  text-[#938f97] '>Oops! No Information available</div>
                    <Link to={'/'} className='text-[#a785ff] text-base sm:text-xl xl:text-4xl underline'>GO HOME</Link>
                </div>
            </section>
        </>
    )
}

export default NotFound;

