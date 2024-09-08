import PeopleIcon from '@mui/icons-material/People';
import Typography from '@mui/material/Typography';

import { PagesRoutes } from '../../router/pages';
import { NavigationLink } from '../NavigationLink/NavigationLink';

export function Logo() {
    return (
        <NavigationLink
            to={PagesRoutes.Rooms}
            color="#fff"
            underline="none"
            sx={{
                display: 'flex',
                gap: 1,
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
        </NavigationLink>
    );
}
