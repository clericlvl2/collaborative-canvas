// Why @app dependency? It's a weak 'type-only' dep, it allows redux middleware to be typed
import type { TRootState } from '@app/store';

import { Middleware } from '@reduxjs/toolkit';

import { LocalStorageService, StorageKey } from '@shared/services';

import { loginUser, logoutUser } from './actions';
import { userDataCleared } from './store';

export const authMiddleware: Middleware<Record<string, unknown>, TRootState>
= () => next => (action) => {
    const isLoginAction = loginUser.fulfilled.match(action);
    const isLogoutAction = logoutUser.fulfilled.match(action)
        || userDataCleared.match(action);

    if (isLoginAction) {
        const { user, token } = action.payload;

        LocalStorageService.set(StorageKey.User, user);
        LocalStorageService.set(StorageKey.Token, token);
    } else if (isLogoutAction) {
        LocalStorageService.remove(StorageKey.User);
        LocalStorageService.remove(StorageKey.Token);
    }

    return next(action);
};
