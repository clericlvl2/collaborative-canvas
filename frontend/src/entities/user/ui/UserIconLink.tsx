import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import { NavigationLink } from '@shared/ui';

export function UserIconLink({ to }: { to: string }) {
    return (
        <Box sx={{ flexGrow: 0 }}>
            <NavigationLink to={to} color="textPrimary" underline="none">
                <Avatar alt="Remy Sharp" />
            </NavigationLink>
        </Box>
    );
}
