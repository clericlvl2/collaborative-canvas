import type { TSocket,TNextCallback } from '../types.js';
import { logError } from '../../utils/errorProcessor.js';
import { verifyUser } from '../../middleware/authMiddleware.js';

export const protect = async (socket: TSocket, next: TNextCallback) => {
    const token = socket.handshake.auth?.token;
    const username = socket.handshake.auth?.name;

    if (!token) {
        return next(new Error('Not authorized, no token'));
    }

    try {
        const { isVerified, userId } = await verifyUser(token);

        if (!isVerified) {
            return next(new Error('Not authorized, no token'));
        }

        socket.data.userId = userId;
        socket.data.username = username;
        next();
    } catch (err) {
        logError(err);
        next(new Error('Not authorized, no token'));
    }
};