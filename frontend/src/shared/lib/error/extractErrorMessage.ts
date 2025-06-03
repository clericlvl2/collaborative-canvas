import { AxiosError } from 'axios';

import { ERROR_MESSAGE } from '@shared/config';

import { instanceOfConditionError } from './instanceOfConditionError';
import { instanceOfHttpError } from './instanceOfHttpError';

const formatErrorMessage = (message: string, status?: number) =>
    message && status ? `${message} (${status})` : message;

export const extractErrorMessage = (e: unknown): string => {
    if (e instanceof AxiosError) {
        const message = e.response?.data?.message ?? e.message;
        const status = e.response?.status ?? e.status;

        return formatErrorMessage(message, status);
    } else if (instanceOfHttpError(e)) {
        return formatErrorMessage(e.message, e.status);
    } else if (instanceOfConditionError(e)) {
        return '';
    } else if (e instanceof Error) {
        return e.message;
    } else {
        return ERROR_MESSAGE.DEFAULT;
    }
};
