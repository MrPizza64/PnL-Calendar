import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './accountSlice.ts'
import modalReducer from './modalSlice.ts'
export const store = configureStore({
    reducer: {
        accounts: accountReducer,
        modals: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;