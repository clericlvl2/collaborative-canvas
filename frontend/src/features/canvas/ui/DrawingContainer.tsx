import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const DrawingContainer = styled(Paper)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    minHeight: '100%',
    cursor: 'crosshair',
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
}));
