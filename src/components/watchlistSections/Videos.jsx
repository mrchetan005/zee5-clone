import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WatchlistCard from "../watchlistCard";
import NothingToWatch from "../nothingToWatch";
import axios from "../../api";
import { Skeleton } from "@mui/material";
import { addRemoveToWatchlist } from "../../api/watchlist";
import Popup from "../utils/Popup";

const Episodes = () => {
    const { width } = useSelector((state) => state.windowSize);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
    const [watchlistData, setWatchlistData] = useState({});

    const removeFromWatchlist = async (id) => {
        const data = await addRemoveToWatchlist(id);
        setWatchlistData(data);
        fetchData();
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/watchlist/like");
            const videos = response.data.data.shows.filter(v => v.type !== 'tv show' && v.type !== 'web series' && v.type !== 'movie');
            setMovies(videos);
            setError(false);
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (error || (movies?.length < 1 && !loading)) {
        return (
            <div className="grid place-items-center">
                <NothingToWatch message={"Uh-Oh! Nothing to watch"} />
            </div>
        );
    }

    return (
        <div
            className={`watchlistContent mt-4 pr-6 grid ${width > 900 ? "grid-cols-2 " : "grid-cols-1"
                }`}
        >
            {movies.map((movie) => (
                <WatchlistCard
                    key={movie._id}
                    {...movie}
                    removeFromWatchlist={removeFromWatchlist}
                />
            ))}
            {loading && <Skeleton />}
            <Popup
                message={watchlistData?.message}
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
            />
        </div>
    );
};

export default Episodes;
