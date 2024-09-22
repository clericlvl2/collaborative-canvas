import { type AxiosInstance } from 'axios';

import HTTPClient from './HTTPClient';
import { Endpoint } from './shared/enums';
import { mapData, Mapper } from './shared/mapper';
import type {
    ILoginParams,
    ILoginResponse,
    IRegisterParams,
    IUser,
    IUserAuthenticationData,
} from './shared/types';

class AuthAPI {
    private readonly _httpClient: AxiosInstance = HTTPClient.getClient();

    async signIn(data: ILoginParams): Promise<IUserAuthenticationData> {
        const response = await this._httpClient.post<ILoginResponse>(
            Endpoint.LogIn,
            data
        );

        return {
            token: response.data.token,
            user: mapData(response.data.user, Mapper.User),
        };
    }

    async signUp(data: IRegisterParams): Promise<IUser> {
        const response = await this._httpClient.post<ILoginResponse>(
            Endpoint.Register,
            data
        );

        return mapData(response.data.user, Mapper.User);
    }
}

const api = new AuthAPI();

export default api;
