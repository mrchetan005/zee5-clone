/* eslint-disable react/prop-types */

import { CloseOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const WatchlistCard = ({ _id, title, thumbnail, removeFromWatchlist }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${_id}`);
    }

    const handleRemoveFromWatchlist = (e) => {
        e.stopPropagation();
        removeFromWatchlist(_id);
    }

    return (
        <div key={_id} onClick={handleClick} className="flex cursor-pointer items-start justify-start mb-4 rounded-md w-full relative">
            <figure className="overflow-hidden rounded-md basis-[45%]">
                <img className="aspect-video hover:scale-105 transition-all duration-200 object-cover object-top" src={thumbnail} alt={title} />
            </figure>
            <div className="basis-[55%] ">
                <h4 to={`/details/${_id}`} className="lg:text-base text-xs overflow-hidden line-clamp-2 max-h-11 pl-4 mr-8 font-semibold my-4 text-white no-underline" >{title}</h4>
            </div>
            <div onClick={handleRemoveFromWatchlist} className="absolute top-0 right-4 cursor-pointer">
                <CloseOutlined className="text-[#ffffff7f] hover:text-white" sx={{ fontSize: 20 }} />
            </div>
        </div>
    )
}

export default WatchlistCard;