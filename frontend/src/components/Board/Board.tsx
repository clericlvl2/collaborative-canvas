import Grid from '@mui/material/Grid2';

import CanvasArea from '../Canvas/CanvasArea';
import Chat from '../Chat/Chat';

function Board() {
    return (
        <Grid
            container
            sx={{
                height: '100%',
            }}
        >
            <Grid size={8}>
                <CanvasArea />
            </Grid>
            <Grid size={4}>
                <Chat />
            </Grid>
        </Grid>
    );
}

export default Board;
