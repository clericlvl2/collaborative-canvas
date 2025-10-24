import type { ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styled from '@mui/system/styled';

const HeaderToolbar = styled(Toolbar)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
}));

export function HeaderLayout({ children }: { children: ReactNode }) {
    return (
        <AppBar component="header" sx={{ gridArea: 'header' }}>
            <HeaderToolbar>{children}</HeaderToolbar>
        </AppBar>
    );
}
