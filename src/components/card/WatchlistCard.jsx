/* eslint-disable react/prop-types */

import { CloseOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";


const WatchlistCard = ({ _id, title, thumbnail, removeFromWatchlist }) => {

    return (
        <div key={_id} className="flex items-start justify-start mb-4 w-full relative">
            <Link to={`/details/${_id}`}>
                <figure className="overflow-hidden rounded-md">
                    <img className="w-[13.5vw] h-[7.5vw] object-cover object-top" src={thumbnail} alt={title} />
                </figure>
            </Link>
            <div className="flex-1">
                <Link to={`/details/${_id}`} >
                    <h4 to={`/details/${_id}`} className="lg:text-base text-xs overflow-hidden line-clamp-2 max-h-11 pl-4 mr-8 font-semibold my-4 text-white no-underline" >{title}</h4>
                </Link>
            </div>
            <div onClick={() => removeFromWatchlist(_id)} className="absolute top-0 right-4 cursor-pointer">
                <CloseOutlined className="text-[#ffffff7f] hover:text-white" sx={{ fontSize: 20 }} />
            </div>
        </div>
    )
}

export default WatchlistCard;