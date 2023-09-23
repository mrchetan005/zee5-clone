import { Link } from 'react-router-dom';
import { PiSmileyThin } from 'react-icons/pi';

const NotFound = () => {
    return (
        <>
            <section className='mx-[7.5%] bg-[#ffffff1a] flex items-center justify-center text-center py-40 '>
                <div className='flex flex-col items-center justify-center gap-6'>
                    <div className="m-auto sadIcon">
                        {/* <img className='w-full object-cover ' src="/assets/icons/sadFile.svg" alt="" /> */}
                        <PiSmileyThin className='text-9xl ' />
                    </div>
                    <div className='mb-4 text-lg sm:text-3xl xl:text-5xl font-semibold  text-[#938f97] '>
                        <p className='text-base sm:text-2xl xl:text-3xl mb-4'>Hi, hope you are doing well.</p>
                        This feature is coming soon, stay tuned!</div>
                    <Link to={'/'} className='text-[#a785ff] text-base sm:text-xl xl:text-4xl underline'>GO HOME</Link>
                </div>
            </section>
        </>
    )
}

export default NotFound;

