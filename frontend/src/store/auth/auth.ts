import { createSlice } from '@reduxjs/toolkit';

import type { IUser } from '../../api/shared/types';
import { RequestStatus } from '../../common/enums';
import type { INullable } from '../../common/types';
import {
    LocalStorageService,
    StorageKey,
} from '../../services/LocalStorageService';
import { executeLogin, executeRegister } from './actions';

interface IAuthState {
    token: INullable<string>;
    user: INullable<IUser>;
    status: RequestStatus;
    error: INullable<string>;
}

const createInitialState = (): IAuthState => {
    const user = LocalStorageService.get(StorageKey.User);
    const token = LocalStorageService.get(StorageKey.Token);

    return {
        user,
        token,
        status: RequestStatus.Idle,
        error: null,
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: createInitialState(),
    reducers: {
        loggedOut: state => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: builder => {
        builder
            // Login
            .addCase(executeLogin.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;

                state.status = RequestStatus.Completed;
                state.error = null;
            })
            .addCase(executeLogin.pending, state => {
                state.status = RequestStatus.Loading;
                state.error = null;
            })
            .addCase(executeLogin.rejected, (state, action) => {
                state.status = RequestStatus.Failed;
                state.error = action.payload.message as string;
            })

            // Register
            .addCase(executeRegister.fulfilled, state => {
                state.status = RequestStatus.Completed;
                state.error = null;
            })
            .addCase(executeRegister.pending, state => {
                state.status = RequestStatus.Loading;
                state.error = null;
            })
            .addCase(executeRegister.rejected, (state, action) => {
                state.status = RequestStatus.Failed;
                state.error = action.payload.message as string;
            });
    },
    selectors: {
        selectUser: state => state.user,
        selectToken: state => state.token,
        selectAuthError: state => state.error,
        selectAuthStatus: state => state.status,
    },
});

export const { selectUser, selectToken, selectAuthStatus, selectAuthError } =
    authSlice.selectors;
export const { loggedOut } = authSlice.actions;

export default authSlice.reducer;
