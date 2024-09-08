import { styled } from '@mui/system';
import type { ReactNode } from 'react';

import { Header } from './Header';
import { Main } from './Main';

const PageGrid = styled('div')({
    display: 'grid',
    gridTemplateAreas: `
        'header'
        'content'
    `,
    height: '100vh',
    gridTemplateRows: '50px 1fr',
});

interface ILayoutProps {
    children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
    return (
        <>
            <PageGrid>
                <Header />
                <Main>{children}</Main>
            </PageGrid>
        </>
    );
}

export default Layout;
