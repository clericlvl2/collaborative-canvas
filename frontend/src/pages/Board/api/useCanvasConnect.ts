import { useCallback, useEffect } from 'react';

import { SocketEvent, useSocketClient } from '@shared/api';
import { usePageParams } from '@shared/config';
import { extractErrorMessage, instanceOfHttpError, useErrorNotification } from '@shared/lib';

type TCanvasDataEventPayload = string;

interface IUseCanvasConnectProps {
    onCanvasDataReceived?: (payload: TCanvasDataEventPayload) => void;
}

interface IUseCanvasConnectReturn {
    sendCanvasData: (canvasData: TCanvasDataEventPayload) => Promise<void>;
}

export const useCanvasConnect = ({
    onCanvasDataReceived,
}: IUseCanvasConnectProps): IUseCanvasConnectReturn => {
    const client = useSocketClient();
    const { boardId } = usePageParams();
    const showError = useErrorNotification();

    const onCanvasDataReceivedHandler = useCallback(
        (payload: TCanvasDataEventPayload) => onCanvasDataReceived?.(payload),
        [onCanvasDataReceived]
    );

    const sendCanvasData = useCallback(
        async (canvasData: TCanvasDataEventPayload) => {
            try {
                const payload = { roomId: boardId, canvasData };
                await client?.emitWithAck(SocketEvent.CanvasAction, payload);
            } catch (e) {
                if (instanceOfHttpError(e)) {
                    showError(extractErrorMessage(e));
                }
            }
        },
        [client, boardId, showError]
    );

    useEffect(
        () => {
            client?.on(
                SocketEvent.CanvasAction,
                onCanvasDataReceivedHandler
            );
            return () => {
                client?.off(
                    SocketEvent.CanvasAction,
                    onCanvasDataReceivedHandler
                );
            };
        },
        [client, onCanvasDataReceivedHandler]
    );

    return { sendCanvasData };
};
