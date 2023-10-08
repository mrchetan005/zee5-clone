/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import styles from './card.module.css';
import WatchButton from "../utils/WatchButton";
import { PiShareFat } from "react-icons/pi";
import { useState } from "react";
import ShareModal from "../utils/ShareModal";


const HorizontalCard = ({ _id, title, thumbnail }) => {
    const navigate = useNavigate();
    const [openShare, setOpenShare] = useState(false);

    const handleOpenShare = () => {
        setOpenShare(true);
    }

    const handleCloseShare = () => {
        setOpenShare(false);
    }

    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'Shared from ZEE5 Cinema App',
                text: 'Check out this cool content!',
                url: location.href,
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    }

    const handleClick = (id) => {
        navigate(`/details/${id}`);
    }

    return (
        <div key={_id} onClick={() => handleClick(_id)} className={`HorizontalCard ${styles.cards} flex items-start justify-start w-full relative`}>
            <div className={`cursor-pointer flex-1`}>
                <figure className="overflow-hidden rounded-md">
                    <img className="w-full aspect-video object-cover object-top" src={thumbnail} alt={title} />
                </figure>
            </div>
            <div className={`flex-1`}>
                <div className="cursor-pointer" to={`/details/${_id}`} >
                    <h4 to={`/details/${_id}`} className="lg:text-base text-xs line-clamp-2 max-h-11 p-4 font-semibold text-white no-underline" >{title}</h4>
                </div>
            </div>
            <div className={`${styles.cardPopup} cardPopUp !pl-3`}>
                <h4 className={styles.title}>{title}</h4>
                <div className={`${styles.bottom}`}>
                    <div className="cursor-pointer">
                        <WatchButton size={15} bgColor='#9727A1' color="white" />
                    </div>
                    <div onMouseLeave={handleCloseShare} onMouseMove={handleOpenShare} onClick={handleShare} className="hover:text-[#9727A1] relative flex items-center font-medium text-[#828282] gap-1 cursor-pointer">
                        <PiShareFat />
                        {
                            openShare && <ShareModal size={'small'} />
                        }
                        <span>Share</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HorizontalCard;

