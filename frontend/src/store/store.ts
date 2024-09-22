import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/auth';
import { authMiddleware } from './auth/middleware';
import roomsReducer from './rooms/rooms';

const rootReducer = combineReducers({
    rooms: roomsReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authMiddleware),
});

export type IAppStore = typeof store;
export type IRootState = ReturnType<typeof rootReducer>;
export type IAppDispatch = IAppStore['dispatch'];
