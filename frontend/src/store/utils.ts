import { AxiosError } from 'axios';

import { ERROR_MESSAGE } from '../common/constants';
import { type IHTTPError } from '../common/errors/HTTPError';

export const getSerializableError = (
    error: unknown,
    fallbackMessage: string = ERROR_MESSAGE.DEFAULT
): IHTTPError => {
    let message = fallbackMessage;
    let status;

    if (error instanceof AxiosError) {
        message = error.response?.data?.message ?? message;
        status = error.response?.status;
    }

    return { message, status };
};
