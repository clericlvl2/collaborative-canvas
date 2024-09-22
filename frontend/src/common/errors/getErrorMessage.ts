import { AxiosError } from 'axios';

import { ERROR_MESSAGE } from '../constants';
import { instanceOfHTTPError } from './HTTPError';

export const formatErrorMessage = (message: string, status?: number) =>
    message && status ? `${message} (${status})` : message;

export const getErrorMessage = (e: unknown): string => {
    if (e instanceof AxiosError) {
        const message = e.response?.data?.message ?? e.message;
        const status = e.response?.status ?? e.status;

        return formatErrorMessage(message, status);
    } else if (instanceOfHTTPError(e)) {
        return formatErrorMessage(e.message, e.status);
    } else if (e instanceof Error) {
        return e.message;
    } else {
        return ERROR_MESSAGE.DEFAULT;
    }
};
