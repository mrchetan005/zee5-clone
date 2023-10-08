import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import windowSizeReducer from './slices/windowSize';
import intersectionReducer from "./slices/intersection";
import watchlistReducer from "./slices/watchlist";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        windowSize: windowSizeReducer,
        intersection: intersectionReducer,
        watchlist: watchlistReducer,
    },
});

export default store;

