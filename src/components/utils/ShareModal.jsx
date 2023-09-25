/* eslint-disable react/prop-types */

import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { HiOutlineLink } from 'react-icons/hi';
import { useRef } from 'react';

const ShareModal = ({ size = '' }) => {
    const copyToClipboardMsg = useRef('');

    const handleCopyLink = async (e) => {
        e.stopPropagation();
        if (navigator?.clipboard?.writeText) {
            const url = window.location.href;
            await navigator.clipboard.writeText(url);
            copyToClipboardMsg.current = 'Link copied to share';
        } else {
            copyToClipboardMsg.current = 'Something went wrong';
        }
    }

    const handleClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={`absolute bottom-full ${size === 'small' ? 'left-1/2 -translate-x-1/2' : 'left-0'}  z-50 flex flex-col bg-white  ${size === 'small' ? 'text-sm' : 'text-2xl'} ${size === 'small' ? 'p-2' : 'p-4'} rounded-md shadow-md`}>
            <div className={`flex  ${size === 'small' ? 'gap-2' : 'gap-4'}`}>
                <a onClick={handleClick} href={`whatsapp://send?text=Watch this cool content: ${window.location.href}`} target="_blank" rel="noreferrer" className={`text-green-400 hover:text-green-500 ${size === 'small' ? 'text-sm' : 'text-2xl'}`}>
                    <FaWhatsapp />
                </a>

                <a onClick={handleClick} href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noreferrer" className={`text-blue-500 hover:text-blue-600 ${size === 'small' ? 'text-sm' : 'text-2xl'}`}>
                    <FaFacebook />
                </a>

                <a onClick={handleClick} href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noreferrer" className={`text-blue-400 hover:text-blue-500 ${size === 'small' ? 'text-sm' : 'text-2xl'}`}>
                    <FaTwitter />
                </a>

                <a onClick={handleClick} href={`mailto:zee5@cinema.com?subject=Check out this cool content&body=Hello, I thought you might find this interesting: ${window.location.href}`} target="_blank" rel="noreferrer" className={`text-blue-500 hover:text-blue-700 ${size === 'small' ? 'text-sm' : 'text-2xl'}`}>
                    <IoMdMail />
                </a>

                <button onClick={handleCopyLink} className={`text-gray-500 hover:text-gray-600 ${size === 'small' ? 'text-sm' : 'text-2xl'}`}>
                    <HiOutlineLink />
                </button>
            </div>
        </div>
    );
};

export default ShareModal;
