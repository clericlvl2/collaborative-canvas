import { type AxiosInstance } from 'axios';

import HTTPClient from './HTTPClient';
import { Endpoint } from './shared/enums';
import type {
    ISignInParams,
    ISignUpParams,
    IUserResponse,
    IUserResponseData,
} from './shared/types';

class AuthController {
    private readonly _httpClient: AxiosInstance = HTTPClient.getInstance();

    async signIn(data: ISignInParams): Promise<IUserResponse> {
        const response = await this._httpClient.post<IUserResponse>(
            Endpoint.LogIn,
            data
        );

        return response.data;
    }

    async signUp(data: ISignUpParams): Promise<IUserResponseData> {
        const response = await this._httpClient.post<IUserResponse>(
            Endpoint.Register,
            data
        );

        return response.data.user;
    }

    // TODO implement signOut
    async signOut(): Promise<void> {
        await Promise.resolve();
        this.removeTokenFromHeaders();
    }

    setTokenToHeaders = (token: string) => {
        HTTPClient.setHeadersField('Authorization', `Bearer ${token}`);
    };

    removeTokenFromHeaders = () => {
        HTTPClient.removeHeadersField('Authorization');
    };
}

const api = new AuthController();

export default api;
