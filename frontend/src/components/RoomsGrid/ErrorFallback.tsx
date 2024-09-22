import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface IRoomsGridErrorProps {
    onRetry: () => void;
}

function ErrorFallback({ onRetry }: IRoomsGridErrorProps) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100%', padding: 2 }}
        >
            <Typography variant="h6" color="error" gutterBottom>
                Something went wrong!
            </Typography>
            <Button variant="contained" color="primary" onClick={onRetry}>
                Refresh
            </Button>
        </Box>
    );
}

export default ErrorFallback;
