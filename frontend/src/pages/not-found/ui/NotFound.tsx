import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled';

import { HOME_ROUTE } from '@shared/config';
import { NavigationLink } from '@shared/ui';

const NotFoundContainer = styled(Container)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
}));

export function NotFound() {
    return (
        <NotFoundContainer>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
                The page you’re looking for doesn’t exist.
            </Typography>
            <NavigationLink to={HOME_ROUTE} sx={{ marginTop: 4 }}>
                <Button variant="contained">Back Home</Button>
            </NavigationLink>
        </NotFoundContainer>
    );
}
