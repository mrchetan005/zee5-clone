
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    width: window.innerWidth,
};

const windowSizeSlice = createSlice({
    name: 'windowSize',
    initialState,
    reducers: {
        setWindowSize: (state, action) => {
            state.width = action.payload.width;
        },
    },
});

export const { setWindowSize } = windowSizeSlice.actions;

export default windowSizeSlice.reducer;

