import { type ComponentType } from 'react';

import { useUser } from '@entities/user';
import { SocketClientProvider } from '@shared/api';

export const connectSocketClient = <P extends Record<string, unknown>>(
    Component: ComponentType<P>
) => (props: P) => {
    const { token } = useUser();

    return (
        <SocketClientProvider token={token}>
            <Component {...props} />
        </SocketClientProvider>
    );
};
