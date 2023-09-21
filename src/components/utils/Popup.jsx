/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'

const Popup = ({ message, isOpen, onClose, hideTime = 2500 }) => {

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, hideTime);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!message) return <></>;

    return (
        <p className={`${isOpen ? 'translate-y-0' : 'translate-y-40'} bottom-10 text-center fixed transition-all duration-500 shadow-md left-1/2 -translate-x-1/2 p-4 bg-[#3b3b3b] z-[60] text-white font-bold text-sm`}>{message}</p>
    )
}

export default React.memo(Popup);