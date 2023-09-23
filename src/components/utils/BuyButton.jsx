/* eslint-disable react/prop-types */

import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthRequired from "../authCommon/AuthRequired";
import { useState } from "react";


const BuyButton = ({ onClick }) => {
    const navigate = useNavigate();
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const { authenticated } = useSelector(state => state.auth);

    if (!onClick) {
        onClick = () => {
            if (authenticated) {
                navigate('/profile/subscriptions');
            } else {
                setOpenAuthModal(true);
            }
        }
    }

    return (
        <>
            <Button onClick={onClick} className='h-[2.2rem] w-28 flex flex-row-reverse items-center gap-1'
                sx={{
                    backgroundColor: '#8230c6',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '7px',
                    color: 'white',
                    transition: 'all 0.3s ease-in',
                    '&:hover': {
                        backgroundColor: '#5c1695',
                    },
                }}
                color="inherit">
                <span className="pt-[4px]">
                    BUY PLAN
                </span>
                <img className="w-5" src="/assets/icons/crown.svg" alt="" />
            </Button>
            {
                !authenticated && openAuthModal &&
                <AuthRequired setOpenAuthModal={setOpenAuthModal} />
            }
        </>
    )
}

export default BuyButton;