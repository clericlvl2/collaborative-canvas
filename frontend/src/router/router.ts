import { createBrowserRouter } from 'react-router-dom';

import App from '../components/App/App';
import ProtectedPage from '../components/Layout/ProtectedPage';
import NotFound from '../pages/NotFound';
import RootRedirect from '../pages/RootRedirect';
import { Pages } from './pages';

export const appRouter = createBrowserRouter([
    {
        path: '/',
        Component: App,
        ErrorBoundary: NotFound,
        children: [
            {
                path: '',
                Component: ProtectedPage,
                children: [
                    {
                        index: true,
                        Component: RootRedirect,
                    },
                    {
                        path: Pages.Rooms,
                        lazy: async () => {
                            const { Rooms } = await import('../pages/Rooms');

                            return { Component: Rooms };
                        },
                    },
                    {
                        path: Pages.Board + '/:boardId',
                        lazy: async () => {
                            const { Board } = await import('../pages/Board');

                            return { Component: Board };
                        },
                    },
                    {
                        path: Pages.Profile,
                        lazy: async () => {
                            const { Profile } = await import(
                                '../pages/Profile'
                            );

                            return { Component: Profile };
                        },
                    },
                ],
            },
            {
                path: Pages.SignIn,
                lazy: async () => {
                    const { SignIn } = await import('../pages/SignIn');

                    return { Component: SignIn };
                },
            },
            {
                path: Pages.SignUp,
                lazy: async () => {
                    const { SignUp } = await import('../pages/SignUp');

                    return { Component: SignUp };
                },
            },
        ],
    },
]);
