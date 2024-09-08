import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { NavigationLink } from '../components/NavigationLink/NavigationLink';
import { PagesRoutes } from '../router/pages';

function NotFound() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
                The page you’re looking for doesn’t exist.
            </Typography>
            <NavigationLink
                to={PagesRoutes.Rooms}
                sx={{
                    marginTop: 4,
                }}
            >
                <Button variant="contained">Back Home</Button>
            </NavigationLink>
        </Box>
    );
}

export default NotFound;
