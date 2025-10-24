import type { IDrawingBoardHandlers } from '@features/canvas/ui/DrawingBoard';

import Grid from '@mui/material/Grid';
import { useRef } from 'react';

import { DrawingBoard } from '@features/canvas';
import { Chat } from '@features/chat';

import { useCanvasConnect } from '../api/useCanvasConnect';
import { useRoomConnect } from '../api/useRoomConnect';
import { useSocketClientConnect } from '../api/useSocketClientConnect';
import { withSockets } from '../api/withSockets';

function Board() {
    const drawingBoardRef = useRef<IDrawingBoardHandlers | null>(null);

    useSocketClientConnect();
    useRoomConnect();
    const { sendCanvasData } = useCanvasConnect({
        onCanvasDataReceived: drawingBoardRef.current?.applyState,
    });

    return (
        <Grid container sx={{ height: '100%' }}>
            <Grid size={8}>
                <DrawingBoard
                    ref={drawingBoardRef}
                    onStateChanged={sendCanvasData}
                />
            </Grid>
            <Grid size={4}>
                <Chat />
            </Grid>
        </Grid>
    );
}

export const BoardWithSockets = withSockets(Board);
