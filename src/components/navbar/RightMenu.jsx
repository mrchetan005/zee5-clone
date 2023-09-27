/* eslint-disable react/prop-types */

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { navbarItems } from './navbarItems';
import { GoPerson } from "react-icons/go";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Link, NavLink } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import BuyButton from '../utils/BuyButton';


// todo: make different component of accordian

let activeLinkCss = 'bg-[hsla(0,0%,100%,0.15)] p-2 block rounded-md text-left';
let nonActiveLinkCss = 'p-2 block rounded-md hover:bg-[hsla(0,0%,100%,0.15)] text-left';


const RightMenu = ({ openModal, toggleModal }) => {
    const { width } = useSelector(state => state.windowSize);
    const { user, authenticated } = useSelector(state => state.auth);


    return (
        <>
            {
                <div onClick={toggleModal}
                    className={`${openModal ? 'left-0' : ''} fixed top-0 right-0  bottom-0 h-screen ${width < 900 ? 'bg-[#0f0617]' : 'bg-[rgba(0,0,0,0.85)]'}  transition-all duration-300 z-[500]`}>
                </div>
            }

            <div className={` ${openModal ? 'active' : ''}  rightMenu overflow-y-auto overscroll-none  transition-all duration-300 p-4 z-[501]`}>
                {
                    width < 900 &&
                    <>
                        <Link onClick={toggleModal} to={"/"} className='fixed w-full -top-16 flex items-center justify-center'>
                            <img
                                className="h-14"
                                src="/zee5.svg"
                                alt="ZEE5 Logo"
                            />
                        </Link>
                        {authenticated
                            ? <Link to={'/profile'} onClick={toggleModal} className="profileBar bg-[#ffffff0f] flex rounded-md  py-3 px-5 ">
                                <GoPerson className="text-[#828282] bg-[#ffffff1a] text-xl rounded-full h-10 w-10 mr-3 p-2" />
                                <div className="username flex items-center justify-between w-full">
                                    <h4 className=" text-[#828282] font-semibold text-base">{user?.name || 'Guest'}</h4>
                                    <ArrowForwardIosRoundedIcon sx={{ fontSize: 20, color: '#a785ff' }} />
                                </div>
                            </Link>
                            : <div className='flex gap-6 items-center justify-center'>
                                <Link to={"/signin"}>
                                    <Button
                                        sx={{
                                            backgroundColor: "transparent",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            borderRadius: "7px",
                                            transition: "all 0.3s ease-in",
                                            "&:hover": {
                                                backgroundColor: "white",
                                                color: "black",
                                            },
                                        }}
                                        variant="outlined"
                                        color="inherit"
                                    >
                                        LOGIN
                                    </Button>
                                </Link>
                                <BuyButton />
                            </div>
                        }
                    </>
                }

                <div className='p-2'>
                    <NavLink to={'/'}
                        onClick={toggleModal}
                        className={({ isActive }) => {
                            return isActive ? activeLinkCss : nonActiveLinkCss
                        }}>Home</NavLink>
                </div>

                <Accordion sx={{ backgroundColor: 'inherit', color: 'inherit' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ color: '#ffffff80' }}>Explore</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="flex flex-col gap-2">
                        {
                            navbarItems.slice(1).map(({ id, name, path }) => (
                                <NavLink to={path}
                                    onClick={toggleModal}
                                    className={({ isActive }) => {
                                        return isActive ? activeLinkCss : nonActiveLinkCss
                                    }} key={id}>{name}</NavLink>
                            ))
                        }
                    </AccordionDetails>
                </Accordion>

                <Divider sx={{ backgroundColor: 'hsla(0,0%,100%,.5)' }} />

                <Accordion sx={{ backgroundColor: 'inherit', color: 'inherit' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ color: '#ffffff80' }}>Plans</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="flex flex-col gap-2">
                        <NavLink to={'/buyplan'}
                            onClick={toggleModal}
                            className={({ isActive }) => {
                                return isActive ? 'bg-[hsla(0,0%,100%,.15)] p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left' : 'p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left'
                            }}>Buy Plan</NavLink>
                        <NavLink to={'/comingsoon'}
                            onClick={toggleModal}
                            className={({ isActive }) => {
                                return isActive ? 'bg-[hsla(0,0%,100%,.15)] p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left' : 'p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left'
                            }}>Have a Prepaid code?</NavLink>
                    </AccordionDetails>
                </Accordion>

                <Divider sx={{ backgroundColor: 'hsla(0,0%,100%,.5)' }} />

                <Accordion sx={{ backgroundColor: 'inherit', color: 'inherit' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ color: '#ffffff80' }}>Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="flex flex-col gap-2">
                        <NavLink to={'/comingsoon'}
                            onClick={toggleModal}
                            className={({ isActive }) => {
                                return isActive ? 'bg-[hsla(0,0%,100%,.15)] p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left' : 'p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left'
                            }}>Reset settings to default</NavLink>
                    </AccordionDetails>
                </Accordion>

                <Divider sx={{ backgroundColor: 'hsla(0,0%,100%,.5)' }} />

                <div className='p-2'>
                    <NavLink to={'/comingsoon'}
                        onClick={toggleModal}
                        className={({ isActive }) => {
                            return isActive ? activeLinkCss : nonActiveLinkCss
                        }}>Refer and earn Discount</NavLink>
                </div>

                <Divider sx={{ backgroundColor: 'hsla(0,0%,100%,.5)' }} />

                <Accordion sx={{ backgroundColor: 'inherit', color: 'inherit' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ color: '#ffffff80' }}>Info</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="flex flex-col gap-2">
                        <NavLink to={'/about'}
                            onClick={toggleModal}
                            className={({ isActive }) => {
                                return isActive ? 'bg-[hsla(0,0%,100%,.15)] p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left' : 'p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left'
                            }}>About Us</NavLink>
                        <NavLink to={'/help'}
                            onClick={toggleModal}
                            className={({ isActive }) => {
                                return isActive ? 'bg-[hsla(0,0%,100%,.15)] p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left' : 'p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left'
                            }}>Help Center</NavLink>
                        <NavLink to={'/comingsoon'}
                            onClick={toggleModal}
                            className={({ isActive }) => {
                                return isActive ? 'bg-[hsla(0,0%,100%,.15)] p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left' : 'p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left'
                            }}>Content Redressal Mechanism</NavLink>
                        <NavLink to={'/termsofuse'}
                            onClick={toggleModal}
                            className={({ isActive }) => {
                                return isActive ? 'bg-[hsla(0,0%,100%,.15)] p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left' : 'p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left'
                            }}>Terms of Use</NavLink>
                        <NavLink to={'/privacypolicy'}
                            onClick={toggleModal}
                            className={({ isActive }) => {
                                return isActive ? 'bg-[hsla(0,0%,100%,.15)] p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left' : 'p-2 w-full rounded-md hover:bg-[hsla(0,0%,100%,.15)] text-left'
                            }}>Privacy Policy</NavLink>
                    </AccordionDetails>
                </Accordion>

                <Divider sx={{ backgroundColor: 'hsla(0,0%,100%,.5)' }} />
            </div>
        </>
    )
}

export default RightMenu;