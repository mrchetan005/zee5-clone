import axios from "."

const addRemoveToWatchlist = async (showId) => {
    try {
        const data = await axios.patch(`/watchlist/like`, { showId: showId });
        return data.data;
    } catch (error) {
        console.log('add to watchlist error => ', error);
        return {};
    }
}

const getWatchlist = async () => {
    try {
        const response = await axios.get(`/watchlist/like`);
        return response.data.data.shows;
    } catch (error) {
        console.log('watchlist error => ', error);
        return [];
    }
}

export { addRemoveToWatchlist, getWatchlist };