import type { IGetRoomsResponse, IRoom, IRoomId } from '@entities/rooms';
import type { TNullable } from '@shared/lib';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus } from '@shared/api';
import { extractErrorMessage } from '@shared/lib';

import { createRoom, deleteRoom, fetchRooms } from './actions';

interface IRoomsState {
    rooms: IGetRoomsResponse;
    status: RequestStatus;
    error: TNullable<string>;
}

const INITIAL_STATE: IRoomsState = {
    rooms: [],
    status: RequestStatus.Idle,
    error: null,
};

export const ROOMS_SLICE_NAME = 'rooms';

const roomsSlice = createSlice({
    name: ROOMS_SLICE_NAME,
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Rooms
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;

                state.status = RequestStatus.Completed;
                state.error = null;
            })
            .addCase(fetchRooms.pending, (state) => {
                state.status = RequestStatus.Loading;
                state.error = null;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = RequestStatus.Failed;
                state.error = extractErrorMessage(action.payload);
            })

            // Create New Room
            .addCase(
                createRoom.fulfilled,
                (state, action: PayloadAction<TNullable<IRoom>>) => {
                    if (!action.payload) {
                        return state;
                    }

                    state.rooms.push(action.payload);
                }
            )

            // Delete Room
            .addCase(
                deleteRoom.fulfilled,
                (state, action: PayloadAction<TNullable<IRoom['id']>>) => {
                    const roomId = action.payload;
                    const index = state.rooms.findIndex(
                        room => room.id === roomId
                    );

                    if (index !== -1) {
                        state.rooms.splice(index, 1);
                    }
                }
            );
    },
    selectors: {
        selectAllRooms: state => state.rooms,
        selectRoomById: (state: IRoomsState, roomId: IRoomId) =>
            state.rooms.find(room => room.id === roomId),
        selectRoomsStatus: state => state.status,
        selectRoomsError: state => state.error,
    },
});

export const roomsReducer = roomsSlice.reducer;
export const {
    selectAllRooms,
    selectRoomById,
    selectRoomsStatus,
    selectRoomsError,
} = roomsSlice.selectors;
