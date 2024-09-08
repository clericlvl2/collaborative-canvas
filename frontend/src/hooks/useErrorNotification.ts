import { useNotifications } from '@toolpad/core/useNotifications';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

import { ERROR_MESSAGE } from '../common/constants';

const AUTO_HIDE_DURATION_MS = 5000;

const ERROR_NOTIFICATION_OPTIONS = {
    severity: 'error',
    autoHideDuration: AUTO_HIDE_DURATION_MS,
} as const;

export const useErrorNotification = () => {
    const { show } = useNotifications();

    const showError = useCallback(
        (e: unknown, message: string) => {
            let errorMessage = ERROR_MESSAGE.UNKNOWN;

            if (e instanceof AxiosError) {
                errorMessage = `${message} (${e.code})`;
            }

            show(errorMessage, ERROR_NOTIFICATION_OPTIONS);
        },
        [show]
    );

    return { showError };
};
