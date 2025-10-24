import type { IGetRoomsResponseDTO, IRoomDTO } from './dto';
import type { ICreateRoomParams, IGetRoomsResponse, IRoom } from './types';

import { client, type THttpClient } from '@shared/api';

import { roomMapper, roomsMapper } from './mappers';

enum Endpoint {
    Rooms = 'rooms'
}

class RoomsAPI {
    constructor(private readonly _httpClient: THttpClient) {}

    async getRooms(): Promise<IGetRoomsResponse> {
        const response = await this._httpClient.get<IGetRoomsResponseDTO>(
            Endpoint.Rooms
        );

        return roomsMapper(response.data);
    }

    async createRoom(data: ICreateRoomParams): Promise<IRoom> {
        const response = await this._httpClient.post<IRoomDTO>(
            Endpoint.Rooms,
            data
        );

        return roomMapper(response.data);
    }

    async deleteRoom(id: string): Promise<IRoom['id']> {
        await this._httpClient.delete(Endpoint.Rooms + `/${id}`);

        return id;
    }
}

export const roomsApi = new RoomsAPI(client);
