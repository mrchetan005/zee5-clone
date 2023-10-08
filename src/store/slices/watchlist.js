import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api";

const filterShowsAfterRemoving = (shows, showsWithId) => {
    return shows?.filter(({ _id }) => showsWithId.includes(_id));
}

export const getWatchlistShows = createAsyncThunk("watchlist/getWatchlistShows", async () => {
    try {
        const response = await axios.get('/watchlist/like');
        return response?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

export const addRemoveFromWatchlist = createAsyncThunk('watchlist/addRemoveFromWatchlist', async (id) => {
    try {
        const response = await axios.patch('/watchlist/like', {
            showId: id
        });
        return response?.data;
    } catch (error) {
        return Promise.reject(error?.response?.data);
    }
});

const initialState = {
    shows: [],
    isAddedToWatchlist: false,
    fetchedShowsAlready: false,
    loading: false,
    error: null,
    message: '',
}

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
        checkIsAddedToWatchlist(state, { payload }) {
            state.isAddedToWatchlist = state?.shows?.some((movie) => movie._id === payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWatchlistShows.pending, (state) => {
                state.loading = true;
                state.message = '';
            })
            .addCase(getWatchlistShows.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.fetchedShowsAlready = true;
                state.shows = payload?.data?.shows;
                state.error = null;
            })
            .addCase(getWatchlistShows.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })
            .addCase(addRemoveFromWatchlist.pending, (state) => {
                state.loading = true;
                state.message = "";
            })
            .addCase(addRemoveFromWatchlist.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.shows = payload?.message.includes('added') ? payload?.data?.shows : filterShowsAfterRemoving(state.shows, payload?.data?.shows);
                state.error = null;
                state.message = payload?.message;
            })
            .addCase(addRemoveFromWatchlist.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })
    },
});

export const { checkIsAddedToWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;

