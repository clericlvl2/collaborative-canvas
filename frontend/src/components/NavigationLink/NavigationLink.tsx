import Link, { type LinkProps } from '@mui/material/Link';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface INavigationLinkProps extends LinkProps {
    to: string;
    children?: ReactNode;
}

export function NavigationLink({
    to,
    children,
    ...props
}: INavigationLinkProps) {
    return (
        <Link {...props} component={RouterLink} to={to} variant="body2">
            {children}
        </Link>
    );
}
