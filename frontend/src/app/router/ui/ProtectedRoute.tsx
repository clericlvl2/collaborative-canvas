import { Navigate, Outlet } from 'react-router';

import { useUser } from '@entities/user';
import { ROUTE } from '@shared/config';

export function ProtectedRoute() {
    const { isLogged } = useUser();

    if (!isLogged) {
        return <Navigate to={ROUTE.LOGIN} replace />;
    }

    return <Outlet />;
}
