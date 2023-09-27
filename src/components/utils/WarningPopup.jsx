/* eslint-disable react/prop-types */
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const WarningPopup = ({ title, message, onConfirm, setOpenWarningModal }) => {

    const handleClick = (e) => {
        onConfirm(!!e?.target?.dataset?.value);
        setOpenWarningModal(false);
    }

    return (
        <div className="fixed top-0 pt-20 h-screen w-full left-0 z-[100] flex justify-center">
            <div className="relative flex flex-col h-fit  gap-4 p-4 pt-6 z-[105] bg-white rounded-xl text-black">
                <h2 className="popupTitle font-bold text-base text-left">{title}</h2>

                <p className="popupMessage text-xs text-[#525252]">{message}</p>

                <button data-value={'yes'} onClick={handleClick} className="w-full py-3 rounded-md shadow-sm border border-[#8230c6] text-sm">Yes</button>

                <button onClick={handleClick} className="w-full py-4 rounded-md text-white shadow-sm bg-[#8230c6] border border-[#8230c6] text-sm">No</button>

                <div onClick={handleClick} className="absolute top-2 right-2">
                    <IconButton color="inherit">
                        <CloseIcon sx={{ color: 'black', fontSize: 20 }} />
                    </IconButton>
                </div>
            </div>

            <div onClick={handleClick}
                className={` fixed inset-0 bg-[rgba(0,0,0,0.8)] z-[100]`}>
            </div>
        </div>
    )
}

export default WarningPopup;
