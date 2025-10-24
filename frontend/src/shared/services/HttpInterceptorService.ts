import { instanceOfHttpError } from '@shared/lib';

import { type THttpClient } from '../api';

import { type ILogoutService } from './ILogoutService';
import { type IStorageService, StorageKey } from './IStorageService';

interface IHttpInterceptorService {
    httpClient: THttpClient;
    logoutService: ILogoutService;
    storageService: IStorageService;
}

export class HttpInterceptorService {
    private readonly _httpClient: THttpClient;
    private readonly _storageService: IStorageService;
    private readonly _logoutService: ILogoutService;

    constructor({
        httpClient,
        logoutService,
        storageService,
    }: IHttpInterceptorService) {
        this._httpClient = httpClient;
        this._logoutService = logoutService;
        this._storageService = storageService;
    }

    setupInterceptors() {
        this.setAuthorizationRequestInterceptor();
        this.setAuthorizationResponseInterceptor();
    }

    resetInterceptors() {
        this._httpClient.clearRequestInterceptors();
        this._httpClient.clearResponseInterceptors();
    }

    private setAuthorizationRequestInterceptor() {
        this._httpClient.setRequestInterceptor(
            (config) => {
                const token = this._storageService.get(StorageKey.Token);

                config.headers.Authorization = token
                    ? `Bearer ${token}`
                    : config.headers.Authorization;

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    private setAuthorizationResponseInterceptor() {
        this._httpClient.setResponseInterceptor(
            response => response,
            (error) => {
                if (
                    instanceOfHttpError(error)
                    && (error.status === 401 || error.status === 403)
                ) {
                    this._logoutService.runLogoutCallbacks();
                }

                return Promise.reject(error);
            }
        );
    }
}
