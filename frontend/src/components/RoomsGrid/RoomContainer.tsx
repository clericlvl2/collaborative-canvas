import { Grid2 } from '@mui/material';
import type { ReactNode } from 'react';

function RoomContainer({ children }: { children: ReactNode }) {
    return <Grid2 size={{ xs: 6, md: 4 }}>{children}</Grid2>;
}

export default RoomContainer;
