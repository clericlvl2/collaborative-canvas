import { createAsyncThunk } from '@reduxjs/toolkit';

import AuthAPI from '../../api/AuthAPI';
import type { ILoginParams, IRegisterParams } from '../../api/shared/types';
import { ERROR_MESSAGE } from '../../common/constants';
import { processError } from '../../common/processError';

export const executeLogin = createAsyncThunk(
    'auth/login',
    async (userForm: ILoginParams, { rejectWithValue }) => {
        try {
            return await AuthAPI.signIn(userForm);
        } catch (e) {
            const processedError = processError(e, ERROR_MESSAGE.LOGIN);

            return rejectWithValue(processedError);
        }
    }
);

export const executeRegister = createAsyncThunk(
    'auth/register',
    async (userForm: IRegisterParams, { rejectWithValue }) => {
        try {
            return await AuthAPI.signUp(userForm);
        } catch (e) {
            const processedError = processError(e, ERROR_MESSAGE.REGISTER);

            return rejectWithValue(processedError);
        }
    }
);
