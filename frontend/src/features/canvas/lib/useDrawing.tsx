import { useCallback, useState } from 'react';

import { COLORS, DRAWING_CONSTANTS, DrawingState } from '../config/drawing';
import { IPosition } from '../model/dimensions';
import { ILineData } from '../model/line';

interface IUseDrawingReturn {
    lines: ILineData[];
    currentLine: number[];
    drawingState: string;
    startDrawing: (position: IPosition) => void;
    continueDrawing: (position: IPosition) => void;
    finishDrawing: () => void;
    clearBoard: () => void;
}

export const useDrawing = (): IUseDrawingReturn => {
    const [lines, setLines] = useState<ILineData[]>([]);
    const [drawingState, setDrawingState] = useState(DrawingState.Idle);
    const [currentLine, setCurrentLine] = useState<number[]>([]);

    const startDrawing = useCallback((position: IPosition) => {
        setDrawingState(DrawingState.Active);
        setCurrentLine([position.x, position.y]);
    }, []);

    const continueDrawing = useCallback((position: IPosition) => {
        if (drawingState !== DrawingState.Active) {
            return;
        }

        setCurrentLine(prev => [...prev, position.x, position.y]);
    }, [drawingState]);

    const finishDrawing = useCallback(() => {
        if (drawingState !== DrawingState.Active) {
            return;
        }

        setLines(prev => [...prev, {
            points: currentLine,
            stroke: COLORS.PRIMARY_STROKE,
            strokeWidth: DRAWING_CONSTANTS.STROKE_WIDTH,
            tension: DRAWING_CONSTANTS.TENSION,
            lineCap: 'round',
            lineJoin: 'round',
            globalCompositeOperation: 'source-over',
        }]);

        setCurrentLine([]);
        setDrawingState(DrawingState.Idle);
    }, [drawingState, currentLine]);

    const clearBoard = useCallback(() => {
        setLines([]);
        setCurrentLine([]);
        setDrawingState(DrawingState.Idle);
    }, []);

    return {
        lines,
        currentLine,
        drawingState,
        startDrawing,
        continueDrawing,
        finishDrawing,
        clearBoard,
    };
};
