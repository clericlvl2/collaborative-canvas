import { Navigate } from 'react-router';

import { HOME_ROUTE } from '@shared/config';

export function HomeRouteRedirect() {
    return <Navigate to={HOME_ROUTE} replace />;
}
