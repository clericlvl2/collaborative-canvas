import { Paper } from '@mui/material';
import styled from '@mui/system/styled';

const CanvasBoard = styled('canvas')({
    height: '100%',
    width: '100%',
});

function CanvasArea() {
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

export default CanvasArea;
