import { createBrowserRouter } from 'react-router';

import { NotFound } from '@pages/not-found';
import { PAGE, PageParams } from '@shared/config';

import { HomeRouteRedirect } from '../ui/HomeRouteRedirect';
import { Page } from '../ui/Page';
import { ProtectedRoute } from '../ui/ProtectedRoute';

export const appRouter = createBrowserRouter([
    {
        path: '/',
        Component: Page,
        ErrorBoundary: NotFound,
        children: [
            {
                path: '',
                Component: ProtectedRoute,
                children: [
                    {
                        index: true,
                        Component: HomeRouteRedirect,
                    },
                    {
                        path: PAGE.ROOMS,
                        lazy: async () => {
                            const { RoomsGrid } = await import('@pages/rooms');

                            return { Component: RoomsGrid };
                        },
                    },
                    {
                        path: `${PAGE.BOARD}/:${PageParams.BoardId}`,
                        lazy: async () => {
                            const { Board } = await import('@pages/board');

                            return { Component: Board };
                        },
                    },
                    {
                        path: PAGE.PROFILE,
                        lazy: async () => {
                            const { ProfileForm } = await import('@pages/profile');

                            return { Component: ProfileForm };
                        },
                    },
                ],
            },
            {
                path: PAGE.LOGIN,
                lazy: async () => {
                    const { LoginForm } = await import('@pages/login');

                    return { Component: LoginForm };
                },
            },
            {
                path: PAGE.REGISTER,
                lazy: async () => {
                    const { RegisterForm } = await import('@pages/register');

                    return { Component: RegisterForm };
                },
            },
        ],
    },
]);
