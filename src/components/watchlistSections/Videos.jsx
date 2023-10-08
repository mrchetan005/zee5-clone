
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NothingToWatch from "../nothingToWatch";
import Popup from "../utils/Popup";
import WatchlistCard from "../card/WatchlistCard";
import { addRemoveFromWatchlist, getWatchlistShows } from "../../store/slices/watchlist";

const Videos = () => {
    const dispatch = useDispatch();
    const { shows, fetchedShowsAlready, message, loading, error } = useSelector(state => state.watchlist);
    const { width } = useSelector((state) => state.windowSize);
    const [movies, setMovies] = useState([]);

    const [showPopup, setShowPopup] = useState(false);

    const removeFromWatchlist = async (id) => {
        dispatch(addRemoveFromWatchlist(id));
    };

    useEffect(() => {
        if (!fetchedShowsAlready) {
            dispatch(getWatchlistShows());
        }
        filterShows();
    }, [shows]);

    const filterShows = () => {
        const filterShows = shows.filter((show) => show.type === "video song");
        setMovies(filterShows);
    };

    if (error || (movies?.length < 1 && !loading)) {
        return (
            <div className="grid place-items-center">
                <NothingToWatch message={"Uh-Oh! Nothing to watch"} />
            </div>
        );
    }

    return (
        <div
            className={`watchlistContent mt-4 pr-6 grid ${width > 900 ? "grid-cols-2 " : "grid-cols-1"}`}
        >
            {movies.map((movie) => (
                <WatchlistCard
                    key={movie._id}
                    {...movie}
                    removeFromWatchlist={removeFromWatchlist}
                />
            ))}
            <Popup
                message={message}
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
            />
        </div>
    );
};

export default Videos;
