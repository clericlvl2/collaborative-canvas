import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { useAuth } from '../../hooks/useAuth';
import { PagesRoutes } from '../../router/pages';
import { Logo } from '../Logo/Logo';
import { NavigationLink } from '../NavigationLink/NavigationLink';

export function Header() {
    const { isLogged } = useAuth();

    return (
        <AppBar
            component="header"
            sx={{
                gridArea: 'header',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <Logo />

                {isLogged && (
                    <Box sx={{ flexGrow: 0 }}>
                        <NavigationLink
                            to={PagesRoutes.Profile}
                            color="textPrimary"
                            underline="none"
                        >
                            <Avatar alt="Remy Sharp" />
                        </NavigationLink>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}
