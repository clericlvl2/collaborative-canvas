import type { ILoginResponseDTO } from './dto';
import type {
    ILoginParams,
    ILoginResponse,
    IRegisterParams,
    IUser,
} from './types';

import { client, type THttpClient } from '@shared/api';

import { userMapper } from './mappers';

export enum Endpoint {
    LogIn = 'auth/login',
    Register = 'auth/register',
    LogOut = 'auth/logout-all-devices'
}

class UserApi {
    constructor(private readonly _httpClient: THttpClient) {}

    async login(data: ILoginParams): Promise<ILoginResponse> {
        const response = await this._httpClient.post<ILoginResponseDTO>(
            Endpoint.LogIn,
            data
        );

        return {
            token: response.data.token,
            user: userMapper(response.data.user),
        };
    }

    async register(data: IRegisterParams): Promise<IUser> {
        const response = await this._httpClient.post<ILoginResponseDTO>(
            Endpoint.Register,
            data
        );

        return userMapper(response.data.user);
    }

    async logout(): Promise<void> {
        await this._httpClient.post<ILoginResponseDTO>(Endpoint.LogOut);
    }
}

export const userApi = new UserApi(client);
