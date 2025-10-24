import { AxiosError } from 'axios';

export const instanceOfAxiosError = (
    error: unknown
): error is AxiosError<{ message?: string }, unknown> =>
    error instanceof AxiosError;
