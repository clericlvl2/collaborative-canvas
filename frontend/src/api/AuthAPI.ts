import {
    LocalStorageService,
    StorageKey,
} from '../services/LocalStorageService';
import HTTPClient, { type HTTPClientInstance } from './HTTPClient';
import { Endpoint } from './shared/enums';
import { mapData, Mapper } from './shared/mapper';
import type {
    ILoginParams,
    ILoginResponse,
    IRegisterParams,
    IUser,
    IUserAuthenticationData,
} from './shared/types';

interface IAuthAPIOptions {
    httpClient: HTTPClientInstance;
}

class AuthAPI {
    private readonly _httpClient: HTTPClientInstance;

    constructor({ httpClient }: IAuthAPIOptions) {
        this._httpClient = httpClient;
    }

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

    async logOut(): Promise<void> {
        await this._httpClient.post<ILoginResponse>(Endpoint.LogOut);
    }

    setAuthorizationInterceptor() {
        this._httpClient.setRequestInterceptor(
            config => {
                const token = LocalStorageService.get(StorageKey.Token);

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }
}

const api = new AuthAPI({ httpClient: HTTPClient });

api.setAuthorizationInterceptor();

export default api;
