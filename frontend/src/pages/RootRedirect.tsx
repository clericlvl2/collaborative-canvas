import { Navigate } from 'react-router-dom';

import { PagesRoutes } from '../router/pages';

function RootRedirect() {
    return <Navigate to={PagesRoutes.Rooms} replace />;
}

export default RootRedirect;
