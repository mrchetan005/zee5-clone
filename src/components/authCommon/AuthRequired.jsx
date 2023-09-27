/* eslint-disable react/prop-types */
import { CloseOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const AuthRequired = ({ setOpenAuthModal }) => {
    const { width } = useSelector(state => state.windowSize);

    return (
        <div className="z-[100] fixed inset-0 h-screen w-screen grid place-items-center">
            <div className={`authRequired shadow-md relative z-[999] text-center flex flex-col gap items-center bg-[#0F0617] justify-evenly h-[350px] ${width < 500 ? 'w-[280px]' : 'w-[500px]'}`}>
                <h1 className="font-bold text-white text-2xl  ">Login Required</h1>
                <p className="text-xl font-bold text-[#ffffff80]">Please login to continue</p>
                <Link to={'/signin'}>
                    <button className="text-sm rounded-md font-bold h-11 w-48 bg-[#8230c6] hover:bg-[#8230c6c3] transition-all duration-300 grid place-items-center">LOGIN</button>
                </Link>
                <div className="divider h-[1px] bg-[#ffffff32] w-full"></div>
                <h2 className="font-bold text-lg text-white">New to ZEE5?</h2>
                <Link to={'/register'}>
                    <button className="text-sm hover:bg-[#0000003b] transition-all duration-300 rounded-md border-[1px] border-white font-bold h-11 w-48 text-white grid place-items-center">Register Now</button>
                </Link>
                <div onClick={() => setOpenAuthModal(false)} className="absolute top-4 right-4 cursor-pointer rounded-full">
                    <CloseOutlined className="text-[#ffffff7f] hover:text-white" sx={{ fontSize: 24 }} />
                </div>
            </div>

            <div className={`fixed pointer-events-none inset-0 bg-[rgba(0,0,0,0.7)] z-50`}>
            </div>
        </div>
    )
}

export default AuthRequired;