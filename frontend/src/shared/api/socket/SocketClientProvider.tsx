import type { TNullable } from '@shared/lib';

import { type ReactNode, useEffect, useState } from 'react';
import { io, type ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

import { BASE_SOCKET_URL } from '@shared/api';

import { SocketClientContext } from './SocketClientContext';

interface ISocketProviderProps {
    children: ReactNode;
    options: TSocketClientOptions;
}

interface ISocketAuthData {
    token: TNullable<string>;
    name: TNullable<string>;
}

type TSocketClientOptions = Partial<
    ManagerOptions &
    SocketOptions &
    { auth?: ISocketAuthData }
>;

export function SocketClientProvider({
    children,
    options,
}: ISocketProviderProps) {
    const [socketClient, setSocketClient] = useState<TNullable<Socket>>(null);

    useEffect(() => {
        if (!options?.auth?.token) {
            setSocketClient(null);
        }

        if (socketClient) {
            return;
        }

        const client = io(BASE_SOCKET_URL, options);

        setSocketClient(client);
    }, [options, socketClient]);

    return (
        <SocketClientContext.Provider value={socketClient}>
            {children}
        </SocketClientContext.Provider>
    );
}
