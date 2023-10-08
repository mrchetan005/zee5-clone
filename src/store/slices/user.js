import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api";

export const signUpUser = createAsyncThunk("user/signUpUser", async (userData) => {
    try {
        const response = await axios.post('https://academics.newtonschool.co/api/v1/user/signup', {
            ...userData
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        status: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = action?.payload?.status;
            })
            .addCase(signUpUser.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })
    },
});


export default userSlice.reducer;

