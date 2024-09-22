import { useDialogs } from '@toolpad/core/useDialogs';
import { useCallback, useRef } from 'react';

import type { INullable } from '../../common/types';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import NewRoomDialog from './NewRoomDialog';
import type { IDialogResult, IRoomDialogProps } from './types';

export const useNewRoomDialog = () => {
    const { open, close } = useDialogs();
    const dialogPromiseRef = useRef<INullable<Promise<IDialogResult>>>(null);
    const showError = useErrorNotification();

    const handleError = useCallback(
        (error: unknown) => {
            showError(error.message);
        },
        [showError]
    );

    const handleClose = useCallback(async () => {
        const dialogPromise = dialogPromiseRef.current;

        if (dialogPromise) {
            await close<IDialogResult>(dialogPromise, false);

            dialogPromiseRef.current = null;
        }
    }, [close]);

    const handleOpen = useCallback(() => {
        const dialogPromise = open<IRoomDialogProps, IDialogResult>(
            NewRoomDialog,
            {
                onError: handleError,
            }
        );

        dialogPromiseRef.current = dialogPromise;

        return dialogPromise;
    }, [open, handleError]);

    return {
        open: handleOpen,
        close: handleClose,
    };
};
