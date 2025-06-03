import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Logo() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <PeopleIcon fontSize="large" />
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: '24px',
                }}
            >
                CCanvas
            </Typography>
        </Box>
    );
}
