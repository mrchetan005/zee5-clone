import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api";

export const loginUser = createAsyncThunk("auth/loginUser", async (userData) => {
    const response = await axios.post('https://academics.newtonschool.co/api/v1/user/login', {
        ...userData
    });
    return response.data;
});

export const updateInfo = createAsyncThunk("auth/updateInfo", async (userData) => {
    const response = await axios.post('https://academics.newtonschool.co/api/v1/user/login', {
        ...userData
    });
    return response.data;
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
    message: ''
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
        signOutUser(state) {
            localStorage.removeItem('auth_token_zee5');
            localStorage.removeItem('user_zee5');
            state.token = null;
            state.user = {
                name: '',
                email: '',
                profileImage: null,
            };
            state.authenticated = false;
            state.loading = false;
            state.message = '';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { token, data } = action.payload;
                state.token = token;
                state.user = { ...data };
                state.authenticated = true;
                state.loading = false;
                window.localStorage.setItem('auth_token_zee5', token);
                window.localStorage.setItem('user_zee5', JSON.stringify(data));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error;
                state.message = action?.payload?.message;
            })
            .addCase(updateInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateInfo.fulfilled, (state, action) => {
                const { token, data } = action.payload;
                state.loading = false;
                state.user = { ...data };
                state.authenticated = true;
                state.loading = false;
                window.localStorage.setItem('auth_token_zee5', token);
                window.localStorage.setItem('user_zee5', JSON.stringify(data));
            })
            .addCase(updateInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error;
                state.message = action?.payload?.message;
            });
    },
});

export const { signOutUser, isUserLoggedIn } = authSlice.actions;

export default authSlice.reducer;

