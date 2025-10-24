import type { ReactNode } from 'react';

import Container from '@mui/material/Container';

interface IMainProps {
    children: ReactNode;
}

export function MainLayout({ children }: IMainProps) {
    return (
        <Container
            component="main"
            sx={{
                gridArea: 'content',
                pt: 8,
                pb: 8,
            }}
        >
            {children}
        </Container>
    );
}
