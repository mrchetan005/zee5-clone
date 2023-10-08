import { createSlice } from "@reduxjs/toolkit";

const intersectionSlice = createSlice({
    name: 'intersection',
    initialState: {
        isIntersecting: false,
    },
    reducers: {
        setIsIntersecting: (state, action) => {
            state.isIntersecting = action.payload;
        }
    }
});

export const { setIsIntersecting } = intersectionSlice.actions;
export default intersectionSlice.reducer;