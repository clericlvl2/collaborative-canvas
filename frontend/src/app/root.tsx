// eslint-disable-next-line import/no-unassigned-import
import './root.css';
// eslint-disable-next-line import/no-unassigned-import
import './i18n';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { DialogsProvider, NotificationsProvider } from '@toolpad/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { getRootElement } from './dom';
import { setupInterceptor } from './interceptor';
import { appRouter } from './router';
import { store } from './store';

setupInterceptor();

const root = createRoot(getRootElement());
const defaultTheme = createTheme();

root.render(
    <StrictMode>
        <ReduxStoreProvider store={store}>
            <MuiThemeProvider theme={defaultTheme}>
                <DialogsProvider>
                    <NotificationsProvider>
                        <CssBaseline />
                        <RouterProvider router={appRouter} />
                    </NotificationsProvider>
                </DialogsProvider>
            </MuiThemeProvider>
        </ReduxStoreProvider>
    </StrictMode>
);
