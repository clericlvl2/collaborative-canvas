import Paper from '@mui/material/Paper';
import styled from '@mui/system/styled';

const CanvasBoard = styled('canvas')({
    height: '100%',
    width: '100%',
});

export function CanvasArea() {
    return (
        <Paper
            variant="outlined"
            sx={color => ({
                height: '100%',
                backgroundColor: color.palette.background.paper,
            })}
        >
            <CanvasBoard />
        </Paper>
    );
}
