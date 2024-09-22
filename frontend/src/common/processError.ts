import { AxiosError } from 'axios';

import { ERROR_MESSAGE } from './constants';

interface IProcessedError {
    status?: number;
    message: string;
}

export const processError = (
    error: unknown,
    fallbackMessage: string = ERROR_MESSAGE.DEFAULT
): IProcessedError => {
    let message = fallbackMessage;
    let status;

    if (error instanceof AxiosError) {
        const responseMessage = error.response?.data?.message;
        status = error.response?.status;

        message =
            responseMessage && status
                ? `${responseMessage} (${status})`
                : fallbackMessage;
    }

    return {
        message: message,
        status,
    };
};
