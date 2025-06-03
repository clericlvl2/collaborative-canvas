import type { IRoomDTO } from './dto';

export interface ICreateRoomParams {
    name: string;
}

export interface IRoom extends Omit<IRoomDTO, '_id'> {
    id: string;
}

export type IGetRoomsResponse = IRoom[];
export type IRoomId = IRoom['id'];
