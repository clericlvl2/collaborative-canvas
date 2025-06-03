import type { IUser } from '@entities/user';
import type { TNullable } from '@shared/lib';

import { createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from '@shared/api';
import { extractErrorMessage } from '@shared/lib';
import { LocalStorageService, StorageKey } from '@shared/services';

import { loginUser, logoutUser, registerUser } from './actions';

interface IUserState {
    token: TNullable<string>;
    user: TNullable<IUser>;
    status: RequestStatus;
    error: TNullable<string>;
}

const initUserStateByLocalStorage = (): IUserState => {
    const user = LocalStorageService.get(StorageKey.User);
    const token = LocalStorageService.get(StorageKey.Token);

    return {
        user,
        token,
        status: RequestStatus.Idle,
        error: null,
    };
};

export const USER_SLICE_NAME = 'user';

const userSlice = createSlice({
    name: USER_SLICE_NAME,
    initialState: initUserStateByLocalStorage(),
    reducers: {
        userDataCleared: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;

                state.status = RequestStatus.Completed;
                state.error = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = RequestStatus.Loading;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = RequestStatus.Failed;
                state.error = extractErrorMessage(action.payload);
            })

            // Register
            .addCase(registerUser.fulfilled, (state) => {
                state.status = RequestStatus.Completed;
                state.error = null;
            })
            .addCase(registerUser.pending, (state) => {
                state.status = RequestStatus.Loading;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = RequestStatus.Failed;
                state.error = extractErrorMessage(action.payload);
            })

            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = RequestStatus.Completed;
                state.error = null;
                state.user = null;
                state.token = null;
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = RequestStatus.Loading;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = RequestStatus.Failed;
                state.error = extractErrorMessage(action.payload);
            });
    },
    selectors: {
        selectUser: state => state.user,
        selectToken: state => state.token,
        selectAuthError: state => state.error,
        selectAuthStatus: state => state.status,
    },
});

export const userReducer = userSlice.reducer;
export const { selectUser, selectToken, selectAuthStatus, selectAuthError }
    = userSlice.selectors;
export const { userDataCleared } = userSlice.actions;
