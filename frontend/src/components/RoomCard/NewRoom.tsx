import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import RoomCardLayout from './RoomCardLayout';
import { useNewRoomDialog } from './useNewRoomDialog';

function NewRoom() {
    const { open: openFormDialog } = useNewRoomDialog();

    return (
        <RoomCardLayout onClick={openFormDialog}>
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
        </RoomCardLayout>
    );
}

export default NewRoom;
