import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { appRouter } from './router/router';

const root = createRoot(document.getElementById('root')!);

root.render(
    <StrictMode>
        <RouterProvider router={appRouter} />
    </StrictMode>
);
