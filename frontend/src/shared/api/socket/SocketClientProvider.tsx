import type { TNullable } from '@shared/lib';

import { type ReactNode, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { BASE_SOCKET_URL } from '@shared/api';

import { SocketClientContext } from './SocketClientContext';

interface ISocketProviderProps {
    children: ReactNode;
    token: TNullable<string>;
}

const getSocketClientOptions = (token: TNullable<string>) => ({
    autoConnect: false,
    auth: {
        token,
    },
    transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
        },
    },
});

export function SocketClientProvider({
    children,
    token,
}: ISocketProviderProps) {
    const [socketClient, setSocketClient] = useState<TNullable<Socket>>(null);

    useEffect(() => {
        if (!token) {
            setSocketClient(null);
        }

        if (socketClient) {
            return;
        }

        const socketClientOptions = getSocketClientOptions(token);
        const client = io(BASE_SOCKET_URL, socketClientOptions);

        setSocketClient(client);
    }, [token, socketClient]);

    return (
        <SocketClientContext.Provider value={socketClient}>
            {children}
        </SocketClientContext.Provider>
    );
}
