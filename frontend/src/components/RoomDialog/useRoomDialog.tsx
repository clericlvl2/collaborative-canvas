import { useDialogs } from '@toolpad/core/useDialogs';
import { useCallback, useRef } from 'react';

import type { ICreateRoomParams } from '../../api/shared/types';
import type { INullable } from '../../common/types';
import { useRooms } from '../../hooks/useRooms';
import RoomDialog from './RoomDialog';
import type { IDialogResult, IRoomDialogProps } from './types';

export const useRoomDialog = () => {
    const { open, close } = useDialogs();
    const { createRoom } = useRooms();

    const dialogPromiseRef = useRef<INullable<Promise<IDialogResult>>>(null);

    const handleSubmit = useCallback(
        async (data: ICreateRoomParams) => createRoom(data),
        [createRoom]
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
            RoomDialog,
            {
                onSubmit: handleSubmit,
            }
        );

        dialogPromiseRef.current = dialogPromise;

        return dialogPromise;
    }, [open, handleSubmit]);

    return {
        open: handleOpen,
        close: handleClose,
    };
};
