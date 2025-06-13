import Grid from '@mui/material/Grid';

import { DrawingBoard } from '@features/canvas';
import { Chat } from '@features/chat';

import { connectSocketClient } from '../api/connectSocketClient';
import { useRoomConnect } from '../api/useRoomConnect';
import { useSocketClientConnect } from '../api/useSocketClientConnect';

function Board() {
    useSocketClientConnect();
    useRoomConnect();

    return (
        <Grid container sx={{ height: '100%' }}>
            <Grid size={8}>
                <DrawingBoard />
            </Grid>
            <Grid size={4}>
                <Chat />
            </Grid>
        </Grid>
    );
}

export const SocketConnectedBoard = connectSocketClient(Board);
