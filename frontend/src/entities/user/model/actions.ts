import type { IThunkApiConfig } from '@shared/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { ERROR_MESSAGE } from '@shared/config';
import { createSerializableErrorObject } from '@shared/lib';

import {
    ILoginParams,
    ILoginResponse,
    IRegisterParams,
    IUser,
} from '../api/types';
import {
    userApi,
} from '../api/userApi';

export const loginUser = createAsyncThunk<
    ILoginResponse,
    ILoginParams,
    IThunkApiConfig
>('auth/login', async (userForm: ILoginParams, thunkApi) => {
    try {
        return await userApi.login(userForm);
    } catch (e) {
        const error = createSerializableErrorObject(e, ERROR_MESSAGE.LOGIN);

        return thunkApi.rejectWithValue(error);
    }
});

export const logoutUser = createAsyncThunk<
    void,
    void,
    IThunkApiConfig
>(
    'auth/logout',
    async (_, thunkApi) => {
        try {
            return await userApi.logout();
        } catch (e) {
            const error = createSerializableErrorObject(
                e,
                ERROR_MESSAGE.LOGOUT
            );

            return thunkApi.rejectWithValue(error);
        }
    }
);

export const registerUser = createAsyncThunk<
    IUser,
    IRegisterParams,
    IThunkApiConfig
>('auth/register', async (userForm: IRegisterParams, thunkApi) => {
    try {
        return await userApi.register(userForm);
    } catch (e) {
        const error = createSerializableErrorObject(e, ERROR_MESSAGE.REGISTER);

        return thunkApi.rejectWithValue(error);
    }
});
