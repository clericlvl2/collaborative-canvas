export { createRoom, deleteRoom, fetchRooms } from './model/actions';

export {
    ROOMS_SLICE_NAME,
    roomsReducer,
    selectAllRooms,
    selectRoomById,
    selectRoomsError,
    selectRoomsStatus,
} from './model/store';

export { roomsApi } from './api/roomsApi';

export type {
    ICreateRoomParams,
    IGetRoomsResponse,
    IRoom,
    IRoomId,
} from './api/types';
