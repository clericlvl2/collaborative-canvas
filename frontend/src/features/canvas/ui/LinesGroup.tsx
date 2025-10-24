import { Line } from 'react-konva';

import { COLORS, DRAWING_CONSTANTS } from '../config/drawing';
import { ILineData } from '../model/line';

interface ILinesGroupProps {
    lines: ILineData[];
    currentLine?: number[];
}

export function LinesGroup({
    lines,
    currentLine,
}: ILinesGroupProps) {
    return (
        <>
            {lines.map((line, index) => <Line key={index} {...line} />)}
            {currentLine && currentLine.length > 0 && (
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
