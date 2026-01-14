import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from './accountSlice.ts';
import modalReducer from './modalSlice.ts';
import pnlReducer from './PnlSlice.ts';
import dayDateReducer from './dayDateSlice.ts';

import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    accounts: accountReducer,
    modals: modalReducer,
    pnl: pnlReducer,
    daydate: dayDateReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accounts", "pnl"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;