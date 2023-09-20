/* eslint-disable react/prop-types */

const NothingToWatch = ({ message, message2 }) => {
    return (
        <div className="text-center ">
            <div className="m-auto sadIcon xl:h-52 xl:w-52 h-20 w-20 overflow-hidden">
                <img className='w-full object-cover ' src="/assets/icons/sadFile.svg" alt="" />
            </div>
            <div className='text-xl pt-4 sm:text-3xl text-[#938f97] '>{message}</div>
            <div className='text-xl pt-4 sm:text-3xl text-[#938f97] '>{message2}</div>
        </div>
    )
}

export default NothingToWatch;