import AddIcon from '@mui/icons-material/Add';
import { alpha, Box, CardContent, Typography } from '@mui/material';

import type { IRoomResponseData as IRoom } from '../../api/shared/types';
import { useRoomDialog } from '../RoomDialog/useRoomDialog';
import CardLayout from './CardLayout';

interface INewRoomProps {
    onCreate: (data: IRoom) => void;
}

function NewRoom({ onCreate }: INewRoomProps) {
    const { open: openFormDialog } = useRoomDialog();

    const handleCardClick = async () => {
        const result = await openFormDialog();

        if (result) {
            onCreate(result);
        }
    };

    return (
        <CardLayout onClick={handleCardClick}>
            <Box
                sx={{
                    height: 140,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: alpha('#1976D2', 0.1),
                }}
            >
                <AddIcon color="primary" style={{ fontSize: 60 }} />
            </Box>
            <CardContent
                sx={{
                    flexGrow: 1,
                }}
            >
                <Typography gutterBottom variant="h5" component="div">
                    Add new room
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Create a space for collaborative work with your colleagues
                </Typography>
            </CardContent>
        </CardLayout>
    );
}

export default NewRoom;
