import { type AxiosInstance } from 'axios';

import HTTPClient from './HTTPClient';
import { Endpoint } from './shared/enums';
import { mapData, Mapper } from './shared/mapper';
import type {
    ICreateRoomParams,
    IRoom,
    IRoomResponseData,
    IRooms,
    IRoomsResponseData,
} from './shared/types';

interface IRoomsAPIOptions {
    httpClient: AxiosInstance;
}

class RoomsAPI {
    private readonly _httpClient: AxiosInstance;

    constructor({ httpClient }: IRoomsAPIOptions) {
        this._httpClient = httpClient;
    }

    async getRooms(): Promise<IRooms> {
        const response = await this._httpClient.get<IRoomsResponseData>(
            Endpoint.Rooms
        );

        return mapData(response.data, Mapper.Rooms);
    }

    async createRoom(data: ICreateRoomParams): Promise<IRoom> {
        const response = await this._httpClient.post<IRoomResponseData>(
            Endpoint.Rooms,
            data
        );

        return mapData(response.data, Mapper.Room);
    }

    async deleteRoom(id: string): Promise<IRoom['id']> {
        await this._httpClient.delete<void>(Endpoint.Rooms + `/${id}`);

        return id;
    }
}

const api = new RoomsAPI({
    httpClient: HTTPClient.getClient(),
});

export default api;
