import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import userReducer from "../slices/user";
import windowSizeReducer from '../slices/windowSize';
import intersectionReducer from "../slices/intersection";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        windowSize: windowSizeReducer,
        intersection: intersectionReducer
    },
});

export default store;

