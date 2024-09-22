import axios, {
    type AxiosInstance,
    type AxiosInterceptorManager,
    type InternalAxiosRequestConfig,
} from 'axios';

import {
    LocalStorageService,
    StorageKey,
} from '../services/LocalStorageService';
import { BASE_API_URL } from './shared/constants';

export interface IClientOptions {
    baseURL?: string;
}

type IRequestInterceptor = AxiosInterceptorManager<InternalAxiosRequestConfig>;
type IRequestInterceptorParameters = Parameters<IRequestInterceptor['use']>;

class HTTPClient {
    private readonly _instance: AxiosInstance = axios.create({
        baseURL: BASE_API_URL,
    });

    constructor({ baseURL }: IClientOptions) {
        this._instance = axios.create({ baseURL });
    }

    getClient() {
        return this._instance;
    }

    setRequestInterceptor(
        onFulfilled: IRequestInterceptorParameters[0],
        onRejected: IRequestInterceptorParameters[1]
    ) {
        this._instance.interceptors.request.use(onFulfilled, onRejected);
    }

    clearRequestInterceptors() {
        this._instance.interceptors.request.clear();
    }
}

const setAuthorizationInterceptor = (httpClient: HTTPClient) => {
    httpClient.setRequestInterceptor(
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
};

const client = new HTTPClient({
    baseURL: BASE_API_URL,
});

setAuthorizationInterceptor(client);

export default client;
