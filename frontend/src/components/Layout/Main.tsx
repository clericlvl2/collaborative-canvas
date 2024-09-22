import Container from '@mui/material/Container';
import type { ReactNode } from 'react';

interface IMainProps {
    children: ReactNode;
}

export function Main({ children }: IMainProps) {
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
