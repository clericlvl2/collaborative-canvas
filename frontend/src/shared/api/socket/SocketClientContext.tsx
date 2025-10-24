import type { TNullable } from '@shared/lib';
import type { Socket } from 'socket.io-client';

import { createContext } from 'react';

export type TSocketClientContext = TNullable<Socket>;

export const SocketClientContext = createContext<TSocketClientContext>(null);
