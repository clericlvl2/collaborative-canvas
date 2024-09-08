import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { getPath, Pages } from '../../router/pages';

function ProtectedPage() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={getPath(Pages.SignIn)} replace />
    );
}

export default ProtectedPage;
