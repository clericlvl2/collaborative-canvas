import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogProps } from '@toolpad/core/useDialogs';

import type { ICreateRoomParams } from '../../api/shared/types';
import CreateRoom from '../Form/CreateRoom';
import type { IDialogResult, IRoomDialogProps } from './types';

function RoomDialog({
    payload,
    open,
    onClose,
}: DialogProps<IRoomDialogProps, IDialogResult>) {
    const closeDialog = () => onClose(false);

    const handleSubmit = async (data: ICreateRoomParams) => {
        const res = await payload.onSubmit(data);
        onClose(res);
    };

    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle
                sx={{
                    textAlign: 'center',
                }}
            >
                Create Room
            </DialogTitle>
            <DialogContent>
                <CreateRoom onSubmit={handleSubmit} onCancel={closeDialog} />
            </DialogContent>
        </Dialog>
    );
}

export default RoomDialog;
