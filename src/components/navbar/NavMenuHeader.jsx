
import { NavLink } from "react-router-dom";
import AppsIcon from '@mui/icons-material/Apps';
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { navbarItems } from "./navbarItems";
import { useSelector } from 'react-redux';

const NavMenuHeader = () => {
    const [showNumber, setShowNumber] = useState(navbarItems.length);
    const { width } = useSelector(state => state.windowSize);

    useEffect(() => {
        if (width < 1200) {
            setShowNumber(navbarItems.length);
        }
        if (width >= 1200) {
            setShowNumber(3);
        }
        if (width >= 1400) {
            setShowNumber(5);
        }
        if (width >= 1800) {
            setShowNumber(9);
        }
    }, [setShowNumber, width, showNumber]);

    return (
        <div className={`navMenu ${width <= 900 ? 'w-full' : width >= 1800 ? 'w-1/2' : 'w-2/5'}`}>
            <div className="text-[#ffffffdd] flex h-16 items-center text-center z-10">
                <ul className="firstHalf flex overflow-hidden overflow-x-auto list-none items-center">
                    {
                        navbarItems.slice(0, showNumber).map(({ id, name, path }) => (
                            <NavLink key={id} to={path}>
                                <li
                                    className={` navlink cursor-pointer mx-4 py-4 text-sm  min-w-max transition-all duration-500 font-medium relative hover:text-white`}>{name}
                                    <div className={`absolute left-0 right-0 bottomLine`}></div>
                                </li>
                            </NavLink>
                        ))
                    }
                </ul>
                {showNumber < navbarItems.length &&
                    <div className="moreMenu ml-3 transition-all duration-300 hover:text-[#da76ff] cursor-pointer relative p-3">
                        <IconButton
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'hsla(0,0%,100%,.15)',
                                },
                            }}
                            color='inherit'>
                            <AppsIcon style={{ fontSize: 22 }} />
                        </IconButton>
                        <ul className="secondHalf text-white absolute top-14 overflow-hidden left-1/2  rounded-md shadow-md  bg-[#0f0617] opacity-0">
                            {
                                navbarItems.slice(showNumber).map(({ id, name, path }) => (
                                    <NavLink to={path} key={id}>
                                        <li
                                            className={` hover:bg-zinc-800 rounded-md  px-5 py-3 text-sm min-w-max  duration-300 text-left `}
                                            key={id}>{name}
                                        </li>
                                    </NavLink>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default NavMenuHeader;
