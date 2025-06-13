import { useEffect } from 'react';

import { useSocketClient } from '@shared/api';

export function useSocketClientConnect() {
    const socketClient = useSocketClient();

    useEffect(
        () => {
            socketClient?.connect();
            return () => {
                socketClient?.disconnect();
            };
        },
        [socketClient]
    );
}
