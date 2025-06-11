import { Types } from 'mongoose';
import { getRoomStateFromDB } from '../services/roomService.js';
import { Server } from 'socket.io';
import { logError } from '../utils/errorProcessor.js';
import type { TSocket } from './types.js';

export default function setupRoomSockets(io: Server, socket: TSocket) {
    socket.on("joinRoom", async ({ roomId }: { roomId: Types.ObjectId }): Promise<void> => {
        try {
            const roomIdStr = roomId.toString();
            socket.join(roomIdStr);

            const roomState = await getRoomStateFromDB(roomId);
            socket.emit("roomState", roomState);

            const userId = socket.data.userId;
            socket.to(roomIdStr).emit("userJoined", userId);
        }
        catch (error: unknown) {
            logError(error, "Error joining room: ");

            if (error instanceof Error) {
                socket.emit("exception", error.message);
            }
        }
    });

    socket.on("leaveRoom", ({ roomId }: { roomId: Types.ObjectId }): void => {
        const roomIdStr = roomId.toString();
        socket.leave(roomIdStr);

        const userId = socket.data.userId;
        socket.to(roomIdStr).emit("userLeft", userId);
    });
};