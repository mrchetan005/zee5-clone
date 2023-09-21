/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

const ExpandableMenu = ({ expandMenu, setExpandMenu, setOpenModal, logout, data }) => {

    return (
        <div className="menu">
            <div onClick={() => setExpandMenu(!expandMenu)} className={`menuTitle cursor-pointer flex items-center justify-between px-8 py-4`}>
                <h3 className="text-sm font-bold text-[#ffffff80]">My Account</h3>
                <ExpandLessRoundedIcon className={`${expandMenu ? 'rotate-0' : 'rotate-180'}`} sx={{ fontSize: 18 }} />
            </div>
            {
                expandMenu &&
                <>
                    {
                        data.map(({ name, path }) => (
                            <Link key={name} onClick={() => setOpenModal(false)} to={path} className="menuItem flex items-center rounded-md hover:bg-gray-900  justify-between mx-4 p-4">
                                <p className="text-sm font-bold capitalize">{name}</p>
                            </Link>
                        ))
                    }
                    <Link onClick={() => {
                        logout();
                        setOpenModal(false)
                    }} className="menuItem flex items-center rounded-md hover:bg-gray-900 justify-between mx-4 p-4">
                        <p className="">Log out</p>
                    </Link>
                </>
            }
        </div>
    )
}

export default ExpandableMenu;