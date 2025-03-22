import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../store/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;