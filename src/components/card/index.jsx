/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import WatchButton from "../utils/WatchButton";
import styles from './card.module.css';
import { PiShareFat } from 'react-icons/pi';
import { useState } from "react";
import ShareModal from "../utils/ShareModal";

const MovieCard = ({ _id, thumbnail, title }) => {
    const [openShare, setOpenShare] = useState(false);
    const navigate = useNavigate();
    const handleOpenShare = () => setOpenShare(true);
    const handleCloseShare = () => setOpenShare(false);

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
        navigate(`/details/show/${id}`);
    }

    const handleWatchClick = (id) => {
        navigate(`/details/${id}`);
    }

    return (
        <div className="relative">
            <div key={_id} className={`${styles.card} movieCard`}>
                <div className={styles.cardWrapper}>
                    <div className="cursor-pointer " onClick={() => handleClick(_id)}>
                        <figure>
                            <img className={``} src={thumbnail} alt={title} />
                        </figure>
                    </div>
                    <div className={`${styles.cardPopup} cardPopUp`}>
                        <h4 className={styles.title}>{title}</h4>
                        <div className={styles.bottom}>
                            <div className="cursor-pointer " onClick={() => handleWatchClick(_id)}>
                                <WatchButton size={15} bgColor='#9727A1' color="white" />
                            </div>
                            <div onMouseLeave={handleCloseShare} onMouseMove={handleOpenShare} onClick={handleShare} className="hover:text-[#9727A1] flex items-center relative cursor-pointer font-medium text-[#828282] gap-1">
                                <PiShareFat />
                                {
                                    openShare && <ShareModal size={'small'} />
                                }
                                <span>Share</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;


