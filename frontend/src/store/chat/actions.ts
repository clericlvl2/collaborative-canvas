import { createAsyncThunk } from '@reduxjs/toolkit';

import { ERROR_MESSAGE } from '../../common/constants';
import { RequestStatus } from '../../common/enums';
import type { IThunkApiConfig } from '../types';
import { getSerializableError } from '../utils';
import { selectChatStatus } from './chat';
import type { IMessage } from './types';

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
            const error = getSerializableError(e, ERROR_MESSAGE.FETCH_ROOMS);

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
