import type { IDialogResult, IRoomDialogProps } from './types';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogProps } from '@toolpad/core/useDialogs';

import { ERROR_MESSAGE } from '@shared/config';

import { RoomCreationDialogForm } from './RoomCreationDialogForm';

export function RoomCreationDialog({
    open,
    onClose,
    payload,
}: DialogProps<IRoomDialogProps, IDialogResult>) {
    const handleError = (e: unknown) => {
        payload.onError?.(e, ERROR_MESSAGE.CREATE_ROOM);
    };

    return (
        <Dialog open={open} onClose={() => onClose(false)} aria-hidden={false}>
            <DialogTitle sx={{ textAlign: 'center' }}>Create Room</DialogTitle>
            <DialogContent>
                <RoomCreationDialogForm
                    onSuccess={() => onClose(true)}
                    onError={handleError}
                    onCancel={() => onClose(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
