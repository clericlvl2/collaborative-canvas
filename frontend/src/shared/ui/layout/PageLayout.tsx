import Box from '@mui/material/Box';
import styled from '@mui/system/styled';

export const PageLayout = styled(Box)({
    display: 'grid',
    gridTemplateAreas: `
        'header'
        'content'
    `,
    height: '100vh',
    gridTemplateRows: '50px 1fr',
});
