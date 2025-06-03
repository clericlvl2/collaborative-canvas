import type { ReactNode } from 'react';

import Grid from '@mui/material/Grid';

export function RoomsGridItem({ children }: { children: ReactNode }) {
    return <Grid size={{ xs: 6, md: 4 }}>{children}</Grid>;
}
