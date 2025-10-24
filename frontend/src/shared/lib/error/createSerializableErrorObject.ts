import type { IHTTPError } from './instanceOfHttpError';

import { ERROR_MESSAGE } from '@shared/config';

import { instanceOfAxiosError } from './instanceOfAxiosError';

export const createSerializableErrorObject = (
    error: unknown,
    fallbackMessage: string = ERROR_MESSAGE.DEFAULT
): IHTTPError => {
    let message = fallbackMessage;
    let status;

    if (instanceOfAxiosError(error)) {
        message = error.response?.data?.message ?? message;
        status = error.response?.status;
    }

    return { message, status };
};
