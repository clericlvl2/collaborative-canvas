import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ActionPanel = styled(Box)(({ theme }) => ({
    position: 'absolute',
    zIndex: 1,
    top: 0,
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));
