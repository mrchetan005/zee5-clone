/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

const Popup = ({ message, isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);

        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!message) return <></>;

    return (
        <p className={`${isVisible ? 'bottom-10' : '-bottom-96'} fixed transition-all duration-500 shadow-md border border-black left-1/2 -translate-x-1/2 p-4 bg-[#3b3b3b] z-[60] text-white font-bold text-sm`}>{message}</p>
    )
}

export default Popup;