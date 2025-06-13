import { type ComponentType, useMemo } from 'react';

import { useUser } from '@entities/user';
import { SocketClientProvider } from '@shared/api';

export const withSockets = <P extends Record<string, unknown>>(
    Component: ComponentType<P>
) => (props: P) => {
    const { user, token } = useUser();

    const socketClientOptions = useMemo(() => ({
        autoConnect: false,
        auth: {
            token,
            name: user?.name ?? null,
        },
    }), [token, user?.name]);

    return (
        <SocketClientProvider options={socketClientOptions}>
            <Component {...props} />
        </SocketClientProvider>
    );
};
