import type { IThunkApiConfig } from '@shared/store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { RequestStatus } from '@shared/api';
import { ERROR_MESSAGE } from '@shared/config';
import { createSerializableErrorObject } from '@shared/lib';

import { roomsApi } from '../api/roomsApi';
import {
    ICreateRoomParams,
    IGetRoomsResponse,
    IRoom,
    IRoomId,
} from '../api/types';

import { selectRoomsStatus } from './store';

export const fetchRooms = createAsyncThunk<
    IGetRoomsResponse,
    void,
    IThunkApiConfig
>(
    'rooms/fetchRooms',
    async (_, thunkApi) => {
        try {
            return await roomsApi.getRooms();
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
        return await roomsApi.createRoom(data);
    } catch (e) {
        const error = createSerializableErrorObject(
            e,
            ERROR_MESSAGE.CREATE_ROOM
        );

        return thunkApi.rejectWithValue(error);
    }
});

export const deleteRoom = createAsyncThunk<IRoomId, IRoomId, IThunkApiConfig>(
    'rooms/deleteRoom',
    async (id: IRoomId, thunkApi) => {
        try {
            return await roomsApi.deleteRoom(id);
        } catch (e) {
            const error = createSerializableErrorObject(
                e,
                ERROR_MESSAGE.DELETE_ROOM
            );

            return thunkApi.rejectWithValue(error);
        }
    }
);
