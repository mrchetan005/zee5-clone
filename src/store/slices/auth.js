import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api";

export const loginUser = createAsyncThunk("auth/loginUser", async (userData) => {
    try {
        const response = await axios.post('https://academics.newtonschool.co/api/v1/user/login', {
            ...userData
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
});

export const updateInfo = createAsyncThunk("auth/updateInfo", async (userData) => {
    try {
        const response = await axios.patch('https://academics.newtonschool.co/api/v1/user/updateme', {
            ...userData
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
});


const initialState = {
    token: null,
    user: {
        name: '',
        email: '',
        profileImage: null,
    },
    authenticated: false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isUserLoggedIn(state) {
            const token = localStorage.getItem('auth_token_zee5');
            if (token) {
                const user = JSON.parse(localStorage.getItem('user_zee5'));
                state.token = token;
                state.user = { ...user };
                state.authenticated = true;
            }
        },
        signOutUser() {
            localStorage.removeItem('auth_token_zee5');
            localStorage.removeItem('user_zee5');
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                const { token, data } = payload;
                state.token = token;
                state.user = { ...data };
                state.authenticated = true;
                state.loading = false;
                window.localStorage.setItem('auth_token_zee5', token);
                window.localStorage.setItem('user_zee5', JSON.stringify(data));
            })
            .addCase(loginUser.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })
            .addCase(updateInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateInfo.fulfilled, (state, { payload }) => {
                const { data } = payload;
                state.user = { ...data.user };
                state.authenticated = true;
                state.loading = false;
                window.localStorage.setItem('user_zee5', JSON.stringify(data.user));
            })
            .addCase(updateInfo.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })
    },
});

export const { signOutUser, isUserLoggedIn } = authSlice.actions;

export default authSlice.reducer;

