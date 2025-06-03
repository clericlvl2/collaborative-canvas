import type { IGetRoomsResponseDTO, IRoomDTO } from './dto';
import type { IRoom } from './types';

export const roomMapper = ({ _id, ...room }: IRoomDTO): IRoom => ({
    ...room,
    id: _id,
});

export const roomsMapper = (rooms: IGetRoomsResponseDTO): IRoom[] =>
    rooms.map(roomMapper);
