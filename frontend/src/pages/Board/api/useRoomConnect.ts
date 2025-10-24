import { useEffect } from 'react';

import { SocketEvent, useSocketClient } from '@shared/api';
import { usePageParams } from '@shared/config';

export function useRoomConnect() {
    const socketClient = useSocketClient();
    const { boardId } = usePageParams();

    useEffect(
        () => {
            socketClient?.emit(SocketEvent.JoinRoom, { roomId: boardId });
            return () => {
                socketClient?.emit(SocketEvent.LeaveRoom, { roomId: boardId });
            };
        },
        [socketClient, boardId]
    );
}
