import { createAsyncThunk } from '@reduxjs/toolkit';

import RoomsAPI from '../../api/RoomsAPI';
import type { ICreateRoomParams, IRoom } from '../../api/shared/types';
import { ERROR_MESSAGE } from '../../common/constants';
import { RequestStatus } from '../../common/enums';
import { processError } from '../../common/processError';
import { selectAuthStatus } from '../auth/auth';
import type { IRootState } from '../store';

type IRoomId = IRoom['id'];

export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async (_, { rejectWithValue }) => {
        try {
            return await RoomsAPI.getRooms();
        } catch (e) {
            const processedError = processError(e, ERROR_MESSAGE.FETCH_ROOMS);

            return rejectWithValue(processedError);
        }
    },
    {
        condition: (_, thunkApi) => {
            const status = selectAuthStatus(thunkApi.getState() as IRootState);

            if (status !== RequestStatus.Idle) {
                return false;
            }
        },
    }
);

export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async (data: ICreateRoomParams, { rejectWithValue }) => {
        try {
            return await RoomsAPI.createRoom(data);
        } catch (e) {
            const processedError = processError(e, ERROR_MESSAGE.CREATE_ROOM);

            return rejectWithValue(processedError);
        }
    }
);

export const deleteRoom = createAsyncThunk(
    'rooms/deleteRoom',
    async (id: IRoomId, { rejectWithValue }) => {
        try {
            return await RoomsAPI.deleteRoom(id);
        } catch (e) {
            const processedError = processError(e, ERROR_MESSAGE.DELETE_ROOM);

            return rejectWithValue(processedError);
        }
    }
);
