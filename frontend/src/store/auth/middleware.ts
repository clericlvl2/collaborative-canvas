import { Middleware } from '@reduxjs/toolkit';

import {
    LocalStorageService,
    StorageKey,
} from '../../services/LocalStorageService';
import type { IRootState } from '../store';
import { executeLogin, executeLogOut } from './actions';
import { loggedOutSync } from './auth';

export const authMiddleware: Middleware<Record<string, unknown>, IRootState> =
    () => next => action => {
        const isLoginAction = executeLogin.fulfilled.match(action);
        const isLogoutAction =
            executeLogOut.fulfilled.match(action) ||
            loggedOutSync.match(action);

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
