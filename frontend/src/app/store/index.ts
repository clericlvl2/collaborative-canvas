import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { roomsReducer } from '@entities/rooms';
import { authMiddleware, userReducer } from '@entities/user';
import { chatReducer } from '@features/chat';

const rootReducer = combineReducers({
    rooms: roomsReducer,
    user: userReducer,
    chat: chatReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authMiddleware),
});

export type TStore = typeof store;
export type TRootReducer = typeof rootReducer;

export type TAppDispatch = TStore['dispatch'];
export type TRootState = ReturnType<TRootReducer>;
