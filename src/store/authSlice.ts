import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginRequest } from "../api/models/request/loginRequest";
import { LoginResponse } from "../api/models/response/loginResponse";
import AuthService from "../api/services/authService";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const getLocalToken = (key: string): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
};

const initialState: AuthState = {
    accessToken: getLocalToken("accessToken"),
    refreshToken: getLocalToken("refreshToken"),
    isAuthenticated: !!getLocalToken("accessToken"),
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginRequest,
    { rejectValue: string }
>(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ошибка авторизации");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                const { accessToken, refreshToken } = action.payload;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.isAuthenticated = true;
                state.loading = false;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Неизвестная ошибка";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;