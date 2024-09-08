import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { PagesRoutes } from '../../router/pages';
import { Logo } from '../Logo/Logo';
import { NavigationLink } from '../NavigationLink/NavigationLink';

// FIXME Header is not updating without useLocation
export function Header() {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

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

                {isAuthenticated && (
                    <Box sx={{ flexGrow: 0 }}>
                        <NavigationLink
                            to={PagesRoutes.Profile}
                            color="textPrimary"
                            underline="none"
                        >
                            <Avatar alt="Remy Sharp" key={location.key} />
                        </NavigationLink>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}
