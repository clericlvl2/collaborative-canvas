import { createAsyncThunk } from '@reduxjs/toolkit';

import RoomsAPI from '../../api/RoomsAPI';
import type { ICreateRoomParams, IRoom, IRooms } from '../../api/shared/types';
import { ERROR_MESSAGE } from '../../common/constants';
import { RequestStatus } from '../../common/enums';
import type { IThunkApiConfig } from '../types';
import { getSerializableError } from '../utils';
import { selectRoomsStatus } from './rooms';

type IRoomId = IRoom['id'];

export const fetchRooms = createAsyncThunk<IRooms, void, IThunkApiConfig>(
    'rooms/fetchRooms',
    async (_, thunkApi) => {
        try {
            return await RoomsAPI.getRooms();
        } catch (e) {
            const error = getSerializableError(e, ERROR_MESSAGE.FETCH_ROOMS);

            return thunkApi.rejectWithValue(error);
        }
    },
    {
        condition: (_, thunkApi) => {
            const status = selectRoomsStatus(thunkApi.getState());

            if (status !== RequestStatus.Idle) {
                return false;
            }
        },
    }
);

export const createRoom = createAsyncThunk<
    IRoom,
    ICreateRoomParams,
    IThunkApiConfig
>('rooms/createRoom', async (data: ICreateRoomParams, thunkApi) => {
    try {
        return await RoomsAPI.createRoom(data);
    } catch (e) {
        const error = getSerializableError(e, ERROR_MESSAGE.CREATE_ROOM);

        return thunkApi.rejectWithValue(error);
    }
});

export const deleteRoom = createAsyncThunk<IRoomId, IRoomId, IThunkApiConfig>(
    'rooms/deleteRoom',
    async (id: IRoomId, thunkApi) => {
        try {
            return await RoomsAPI.deleteRoom(id);
        } catch (e) {
            const error = getSerializableError(e, ERROR_MESSAGE.DELETE_ROOM);

            return thunkApi.rejectWithValue(error);
        }
    }
);
