import { useCallback } from 'react';

import AuthController from '../api/AuthController';
import type { ISignInParams, ISignUpParams } from '../api/shared/types';
import { ERROR_MESSAGE } from '../common/constants';
import { LocalStorageKey } from '../common/enums';
import type { IResult } from './types';
import { useErrorNotification } from './useErrorNotification';

export const useAuth = () => {
    const { showError } = useErrorNotification();
    const authToken = localStorage.getItem(LocalStorageKey.AuthToken);

    const signIn = useCallback(
        async (data: ISignInParams): Promise<IResult> => {
            let result = false;

            try {
                const { token, user } = await AuthController.signIn(data);
                AuthController.setTokenToHeaders(token);
                localStorage.setItem(LocalStorageKey.AuthToken, token);
                localStorage.setItem(LocalStorageKey.UserName, user.name);
                localStorage.setItem(LocalStorageKey.UserEmail, user.email);

                result = true;
            } catch (e) {
                showError(e, ERROR_MESSAGE.DEFAULT);
            }

            return result;
        },
        [showError]
    );

    const signUp = useCallback(
        async (data: ISignUpParams): Promise<IResult> => {
            let result = false;

            try {
                await AuthController.signUp(data);

                result = true;
            } catch (e) {
                showError(e, ERROR_MESSAGE.DEFAULT);
            }

            return result;
        },
        [showError]
    );

    const signOut = useCallback(async (): Promise<IResult> => {
        let result = false;

        try {
            await AuthController.signOut();
            AuthController.removeTokenFromHeaders();

            localStorage.removeItem(LocalStorageKey.AuthToken);
            localStorage.removeItem(LocalStorageKey.UserName);
            localStorage.removeItem(LocalStorageKey.UserEmail);

            result = true;
        } catch (e) {
            showError(e, ERROR_MESSAGE.DEFAULT);
        }

        return result;
    }, [showError]);

    return {
        isAuthenticated: Boolean(authToken),
        signIn,
        signUp,
        signOut,
    };
};
