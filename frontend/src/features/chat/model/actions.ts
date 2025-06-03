import type { IMessage } from './types';
import type { IThunkApiConfig } from '@shared/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { RequestStatus } from '@shared/api';
import { ERROR_MESSAGE } from '@shared/config';
import { createSerializableErrorObject } from '@shared/lib';

import { selectChatStatus } from './store';

export const fetchMessages = createAsyncThunk<
    IMessage[],
    void,
    IThunkApiConfig
>(
    'chat/fetchMessages',
    async (_, thunkApi) => {
        try {
            return Promise.resolve([]);
        } catch (e) {
            const error = createSerializableErrorObject(
                e,
                ERROR_MESSAGE.FETCH_ROOMS
            );

            return thunkApi.rejectWithValue(error);
        }
    },
    {
        condition: (_, thunkApi) => {
            const status = selectChatStatus(thunkApi.getState());

            if (status !== RequestStatus.Idle) {
                return false;
            }
        },
    }
);
