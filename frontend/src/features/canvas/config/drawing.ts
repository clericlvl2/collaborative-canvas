import { red } from '@mui/material/colors';

export const DRAWING_CONSTANTS = {
    STROKE_WIDTH: 3,
    TENSION: 0.5,
    MIN_LINE_POINTS: 4,
    HEADER_HEIGHT: 60,
};

export const COLORS = {
    PRIMARY_STROKE: red['600'],
};

export enum DrawingState {
    Idle = 'idle',
    Active = 'active'
}
