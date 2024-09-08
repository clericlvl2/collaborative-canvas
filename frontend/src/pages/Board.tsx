import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

export function Board() {
    const { state } = useLocation();

    return (
        <Box>
            <Typography>Welcome to collaborative board #{state.id}</Typography>
        </Box>
    );
}
