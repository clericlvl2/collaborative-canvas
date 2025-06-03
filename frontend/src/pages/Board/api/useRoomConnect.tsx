import { useEffect } from 'react';
import { useParams } from 'react-router';

import { SocketEvent, useSocketClient } from '@shared/api';

export function useRoomConnect() {
    const socketClient = useSocketClient();
    const { boardId } = useParams();

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
