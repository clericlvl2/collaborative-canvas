import CardContent from '@mui/material/CardContent';

import { CardDescription, CardLayout, CardTitle } from '@shared/ui';

import { RoomCreationCardMedia } from './RoomCreationCardMedia';
import { useRoomCreationDialog } from './useRoomCreationDialog';

export function RoomCreationCard() {
    const { open: openFormDialog } = useRoomCreationDialog();

    return (
        <CardLayout onClick={openFormDialog}>
            <RoomCreationCardMedia />
            <CardContent sx={{ flexGrow: 1 }}>
                <CardTitle title="Add new room" />
                <CardDescription
                    description="Create a space for collaborative work with your colleagues"
                />
            </CardContent>
        </CardLayout>
    );
}
