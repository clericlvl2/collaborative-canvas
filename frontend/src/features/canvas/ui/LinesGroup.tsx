import { Line } from 'react-konva';

import { COLORS, DRAWING_CONSTANTS, DrawingState } from '../config/drawing';
import { ILineData } from '../model/line';

interface ILinesGroupProps {
    lines: ILineData[];
    currentLine: number[];
    drawingState: string;
}

export function LinesGroup({
    lines,
    currentLine,
    drawingState,
}: ILinesGroupProps) {
    const isDrawingActive = drawingState === DrawingState.Active;

    return (
        <>
            {lines.map((line, index) => <Line key={index} {...line} />)}
            {isDrawingActive && currentLine.length > 0 && (
                <Line
                    points={currentLine}
                    stroke={COLORS.PRIMARY_STROKE}
                    strokeWidth={DRAWING_CONSTANTS.STROKE_WIDTH}
                    tension={DRAWING_CONSTANTS.TENSION}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation="source-over"
                />
            )}
        </>
    );
}
