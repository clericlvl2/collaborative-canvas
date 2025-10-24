import { redirect } from 'react-router-dom';

import { userDataCleared } from '@entities/user';
import { client } from '@shared/api';
import { PAGE } from '@shared/config';
import {
    HttpInterceptorService,
    LocalStorageService,
    LogoutService,
} from '@shared/services';

import { store } from '../store';

export const setupInterceptor = () => {
    const logoutService = new LogoutService();
    const httpInterceptorService = new HttpInterceptorService({
        httpClient: client,
        logoutService,
        storageService: LocalStorageService,
    });

    logoutService.registerLogoutCallback(
        () => store.dispatch(userDataCleared())
    );
    logoutService.registerLogoutCallback(() => redirect(PAGE.LOGIN));
    httpInterceptorService.setupInterceptors();
};
