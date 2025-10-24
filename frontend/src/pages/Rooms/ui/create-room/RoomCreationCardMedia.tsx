import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import styled from '@mui/system/styled';

const CardMediaContainer = styled(Box)(() => ({
    height: 140,
    width: '100%',
    backgroundColor: alpha('#1976D2', 0.1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export function RoomCreationCardMedia() {
    return (
        <CardMediaContainer>
            <AddIcon color="primary" style={{ fontSize: 60 }} />
        </CardMediaContainer>
    );
}
