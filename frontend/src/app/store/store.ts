import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { roomsReducer } from '@entities/rooms';
import { userReducer } from '@entities/user';
import { chatReducer } from '@features/chat';

import { listenerMiddleware } from './listenerMiddleware';

const rootReducer = combineReducers({
    rooms: roomsReducer,
    user: userReducer,
    chat: chatReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

type TStore = typeof store;
type TRootReducer = typeof rootReducer;

export type TAppDispatch = TStore['dispatch'];
export type TRootState = ReturnType<TRootReducer>;
