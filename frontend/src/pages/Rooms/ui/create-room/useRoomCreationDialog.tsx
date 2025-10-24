import type { IDialogResult, IRoomDialogProps } from './types';
import type { TNullable } from '@shared/lib';

import { useDialogs } from '@toolpad/core/useDialogs';
import { useCallback, useRef } from 'react';

import {
    extractErrorMessage,
    useErrorNotification,
} from '@shared/lib';

import { RoomCreationDialog } from './RoomCreationDialog';

export const useRoomCreationDialog = () => {
    const { open, close } = useDialogs();
    const dialogPromiseRef = useRef<TNullable<Promise<IDialogResult>>>(null);
    const showError = useErrorNotification();

    const handleError = useCallback(
        (e: unknown) => showError(extractErrorMessage(e)),
        [showError]
    );

    const handleClose = useCallback(async () => {
        const dialogPromise = dialogPromiseRef.current;

        if (!dialogPromise) {
            return;
        }

        await close<IDialogResult>(dialogPromise, false);
        dialogPromiseRef.current = null;
    }, [close]);

    const handleOpen = useCallback(() => {
        const dialogPromise = open<IRoomDialogProps, IDialogResult>(
            RoomCreationDialog,
            { onError: handleError }
        );

        dialogPromiseRef.current = dialogPromise;

        return dialogPromise;
    }, [open, handleError]);

    return {
        open: handleOpen,
        close: handleClose,
    };
};
