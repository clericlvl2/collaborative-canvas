import { useNotifications } from '@toolpad/core/useNotifications';
import { useCallback } from 'react';

const AUTO_HIDE_DURATION_MS = 5000;

const ERROR_NOTIFICATION_OPTIONS = {
    severity: 'error',
    autoHideDuration: AUTO_HIDE_DURATION_MS,
} as const;

export const useErrorNotification = () => {
    const { show } = useNotifications();

    const showError = useCallback(
        (message: string) => show(message, ERROR_NOTIFICATION_OPTIONS),
        [show]
    );

    return showError;
};
