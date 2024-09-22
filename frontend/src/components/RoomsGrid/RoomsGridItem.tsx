import Grid2 from '@mui/material/Grid2';
import type { ReactNode } from 'react';

function RoomsGridItem({ children }: { children: ReactNode }) {
    return <Grid2 size={{ xs: 6, md: 4 }}>{children}</Grid2>;
}

export default RoomsGridItem;
