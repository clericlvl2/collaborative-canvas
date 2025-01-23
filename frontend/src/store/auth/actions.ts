import { createAsyncThunk } from '@reduxjs/toolkit';

import AuthAPI from '../../api/AuthAPI';
import type {
    ILoginParams,
    IRegisterParams,
    IUser,
    IUserAuthenticationData,
} from '../../api/shared/types';
import { ERROR_MESSAGE } from '../../common/constants';
import type { IThunkApiConfig } from '../types';
import { getSerializableError } from '../utils';

export const executeLogin = createAsyncThunk<
    IUserAuthenticationData,
    ILoginParams,
    IThunkApiConfig
>('auth/login', async (userForm: ILoginParams, thunkApi) => {
    try {
        return await AuthAPI.signIn(userForm);
    } catch (e) {
        const error = getSerializableError(e, ERROR_MESSAGE.LOGIN);

        return thunkApi.rejectWithValue(error);
    }
});

export const executeLogOut = createAsyncThunk<void, void, IThunkApiConfig>(
    'auth/logout',
    async (_, thunkApi) => {
        try {
            return await AuthAPI.logOut();
        } catch (e) {
            const error = getSerializableError(e, ERROR_MESSAGE.LOGOUT);

            return thunkApi.rejectWithValue(error);
        }
    }
);

export const executeRegister = createAsyncThunk<
    IUser,
    IRegisterParams,
    IThunkApiConfig
>('auth/register', async (userForm: IRegisterParams, thunkApi) => {
    try {
        return await AuthAPI.signUp(userForm);
    } catch (e) {
        const error = getSerializableError(e, ERROR_MESSAGE.REGISTER);

        return thunkApi.rejectWithValue(error);
    }
});
