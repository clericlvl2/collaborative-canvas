import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Konva from 'konva';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Layer, Stage } from 'react-konva';

import { NamespaceI18N } from '@shared/config';

import { getEventPointerPosition } from '../lib/getEventPointerPosition';
import { useContainerSize } from '../lib/useContainerSize';
import { useDrawing } from '../lib/useDrawing';

import { LinesGroup } from './LinesGroup';

const DrawingContainer = styled(Paper)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    minHeight: '100%',
    cursor: 'crosshair',
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
}));

const ActionPanel = styled(Box)(({ theme }) => ({
    position: 'absolute',
    zIndex: 1,
    top: 0,
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const ClearButton = styled(Button)({
    transition: 'opacity 0.2s ease-in-out',
    opacity: 1,
    '&:hover': {
        transform: 'opacity .85',
    },
});

export function DrawingBoard() {
    const { t } = useTranslation();
    const { containerSize, containerRef } = useContainerSize({
        initialWidth: 0,
        initialHeight: 0,
    });

    const {
        lines,
        currentLine,
        drawingState,
        startDrawing,
        continueDrawing,
        finishDrawing,
        clearBoard,
    } = useDrawing();

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
            {/* Header */}
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
                onMousemove={handlePointerMove}
                onMouseup={handlePointerUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <Layer>
                    <LinesGroup
                        lines={lines}
                        currentLine={currentLine}
                        drawingState={drawingState}
                    />
                </Layer>
            </Stage>
        </DrawingContainer>
    );
}
