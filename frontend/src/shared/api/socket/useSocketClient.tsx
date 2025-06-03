import { useContext } from 'react';

import { SocketClientContext } from './SocketClientContext';

export const useSocketClient = () => {
    return useContext(SocketClientContext);
};
