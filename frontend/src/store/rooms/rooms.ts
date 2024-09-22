import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { IRoom, IRooms } from '../../api/shared/types';
import { RequestStatus } from '../../common/enums';
import type { INullable } from '../../common/types';
import { createRoom, deleteRoom, fetchRooms } from './actions';

type IRoomId = IRoom['id'];

export interface RoomsState {
    rooms: IRooms;
    status: RequestStatus;
    error: INullable<string>;
}

const INITIAL_STATE: RoomsState = {
    rooms: [],
    status: RequestStatus.Idle,
    error: null,
};

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: builder => {
        builder
            // Fetch Rooms
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;

                state.status = RequestStatus.Completed;
                state.error = null;
            })
            .addCase(fetchRooms.pending, state => {
                state.status = RequestStatus.Loading;
                state.error = null;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = RequestStatus.Failed;
                state.error = action.payload.message as string;
            })

            // Create New Room
            .addCase(
                createRoom.fulfilled,
                (state, action: PayloadAction<INullable<IRoom>>) => {
                    if (!action.payload) {
                        return state;
                    }

                    state.rooms.push(action.payload);
                }
            )

            // Delete Room
            .addCase(
                deleteRoom.fulfilled,
                (state, action: PayloadAction<INullable<IRoom['id']>>) => {
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
        selectRoomById: (state: RoomsState, roomId: IRoomId) =>
            state.rooms.find(room => room.id === roomId),
        selectRoomsStatus: state => state.status,
        selectRoomsError: state => state.error,
    },
});

export const {
    selectAllRooms,
    selectRoomById,
    selectRoomsStatus,
    selectRoomsError,
} = roomsSlice.selectors;

export default roomsSlice.reducer;
