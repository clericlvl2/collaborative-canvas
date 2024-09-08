import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DialogsProvider, NotificationsProvider } from '@toolpad/core';
import { Outlet } from 'react-router-dom';

import Layout from '../Layout/Layout';

const defaultTheme = createTheme();

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <DialogsProvider>
                <NotificationsProvider>
                    <CssBaseline />
                    <Layout>
                        <Outlet />
                    </Layout>
                </NotificationsProvider>
            </DialogsProvider>
        </ThemeProvider>
    );
}

export default App;
