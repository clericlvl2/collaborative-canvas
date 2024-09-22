import { useNotifications } from '@toolpad/core/useNotifications';
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
        (message: string = ERROR_MESSAGE.UNKNOWN) => {
            show(message, ERROR_NOTIFICATION_OPTIONS);
        },
        [show]
    );

    return showError;
};
