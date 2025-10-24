import DeleteIcon from '@mui/icons-material/Delete';
import Konva from 'konva';
import { type ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layer, Stage } from 'react-konva';

import { NamespaceI18N } from '@shared/config';

import { getEventPointerPosition } from '../lib/getEventPointerPosition';
import { useContainerSize } from '../lib/useContainerSize';
import { useDrawing } from '../lib/useDrawing';
import { ILineData } from '../model/line';

import { ActionPanel } from './ActionPanel';
import { ClearButton } from './ClearButton';
import { DrawingContainer } from './DrawingContainer';
import { LinesGroup } from './LinesGroup';

interface IDrawingBoardProps {
    onStateChanged: (stringifiedData: string) => Promise<void>;
}

export interface IDrawingBoardHandlers {
    applyState: (data: string) => void;
}

const INITIAL_CONTAINER_PARAMS = {
    initialWidth: 0,
    initialHeight: 0,
};

export const DrawingBoard = forwardRef((
    {
        onStateChanged,
    }: IDrawingBoardProps,
    ref: ForwardedRef<IDrawingBoardHandlers>
) => {
    const { t } = useTranslation();
    const [membersLines, setMembersLines] = useState<ILineData[]>([]);
    const {
        containerSize,
        containerRef,
    } = useContainerSize(INITIAL_CONTAINER_PARAMS);

    const {
        lines,
        currentLine,
        startDrawing,
        continueDrawing,
        finishDrawing,
        clearBoard,
    } = useDrawing();

    useImperativeHandle(
        ref,
        () => ({
            applyState: (serializedData: string) => {
                const linesData: ILineData[] = JSON.parse(serializedData);
                setMembersLines(linesData);
            },
        }),
        []
    );

    useEffect(() => {
        const onLinesChanged = () => {
            const serializedLines = JSON.stringify(lines);
            onStateChanged(serializedLines).catch();
        };

        onLinesChanged();
    }, [lines, onStateChanged]);

    const handlePointerDown = useCallback(
        (event: Konva.KonvaEventObject<MouseEvent>) => {
            const position = getEventPointerPosition(event);

            if (position) {
                startDrawing(position);
            }
        },
        [startDrawing]
    );

    const handlePointerMove = useCallback(
        (event: Konva.KonvaEventObject<MouseEvent>) => {
            const position = getEventPointerPosition(event);

            if (position) {
                continueDrawing(position);
            }
        },
        [continueDrawing]
    );

    const handlePointerUp = useCallback(
        () => {
            finishDrawing();
        },
        [finishDrawing]
    );

    const handleTouchStart = useCallback(
        (event: Konva.KonvaEventObject<TouchEvent>) => {
            event.evt.preventDefault();
            const position = getEventPointerPosition(event);

            if (position) {
                startDrawing(position);
            }
        },
        [startDrawing]
    );

    const handleTouchMove = useCallback(
        (event: Konva.KonvaEventObject<TouchEvent>) => {
            event.evt.preventDefault();
            const position = getEventPointerPosition(event);

            if (position) {
                continueDrawing(position);
            }
        },
        [continueDrawing]
    );

    const handleTouchEnd = useCallback(
        (event: Konva.KonvaEventObject<TouchEvent>) => {
            event.evt.preventDefault();
            finishDrawing();
        },
        [finishDrawing]
    );

    return (
        <DrawingContainer ref={containerRef} variant="outlined">
            <ActionPanel>
                <ClearButton
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={clearBoard}
                >
                    {t('clear-board', { ns: NamespaceI18N.Draw })}
                </ClearButton>
            </ActionPanel>

            <Stage
                width={containerSize.width}
                height={containerSize.height}
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Room members layer */}
                <Layer>
                    <LinesGroup lines={membersLines} />
                </Layer>

                {/* User layer */}
                <Layer>
                    <LinesGroup
                        lines={lines}
                        currentLine={currentLine}
                    />
                </Layer>
            </Stage>
        </DrawingContainer>
    );
});
