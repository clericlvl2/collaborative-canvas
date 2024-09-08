import { type AxiosInstance } from 'axios';

import HTTPClient from './HTTPClient';
import { Endpoint } from './shared/enums';
import type {
    ICreateRoomParams,
    IRoomResponseData,
    IRoomsResponseData,
} from './shared/types';

class RoomsController {
    private readonly _httpClient: AxiosInstance = HTTPClient.getInstance();

    async getRooms(): Promise<IRoomsResponseData> {
        const response = await this._httpClient.get<IRoomsResponseData>(
            Endpoint.Rooms
        );

        return response.data;
    }

    async createRoom(data: ICreateRoomParams): Promise<IRoomResponseData> {
        const response = await this._httpClient.post<IRoomResponseData>(
            Endpoint.Rooms,
            data
        );

        return response.data;
    }
}

const api = new RoomsController();

export default api;
