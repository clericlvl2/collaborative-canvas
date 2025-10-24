// Why @app dependency? It's a weak 'type-only' dep, it allows redux middleware to be typed
import type { TAppStartListening } from '@app/store';

import { isAnyOf } from '@reduxjs/toolkit';

import { LocalStorageService, StorageKey } from '@shared/services';

import { loginUser, logoutUser } from './actions';
import { userDataCleared } from './store';

export const addAuthListeners = (startAppListening: TAppStartListening) => {
    startAppListening({
        actionCreator: loginUser.fulfilled,
        effect: async (action) => {
            const { user, token } = action.payload;

            LocalStorageService.set(StorageKey.User, user);
            LocalStorageService.set(StorageKey.Token, token);
        },
    });

    startAppListening({
        matcher: isAnyOf(logoutUser.fulfilled, userDataCleared),
        effect: async () => {
            LocalStorageService.remove(StorageKey.User);
            LocalStorageService.remove(StorageKey.Token);
        },
    });
};
