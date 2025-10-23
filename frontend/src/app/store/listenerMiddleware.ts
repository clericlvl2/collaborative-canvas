import { createListenerMiddleware } from '@reduxjs/toolkit';

import { TAppDispatch, TRootState } from './index';

import { addAuthListeners } from '@entities/user';

export const listenerMiddleware = createListenerMiddleware();

const startAppListening = listenerMiddleware
    .startListening
    .withTypes<TRootState, TAppDispatch>();

export type TAppStartListening = typeof startAppListening;

addAuthListeners(startAppListening);
