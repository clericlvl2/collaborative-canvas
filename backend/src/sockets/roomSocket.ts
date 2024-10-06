import { Types } from 'mongoose';
import { getRoomStateFromDB } from '../services/roomService.js';
import { Server } from 'socket.io';
import { logError } from '../utils/errorProcessor.js';
import { CustomSocket } from './index.js';


export default function handleRoomSockets(io: Server, socket: CustomSocket) {
    socket.on("joinRoom", async ({ roomId }: { roomId: Types.ObjectId }): Promise<void> => {
        try {
            const roomIdStr: string = roomId.toString();
            socket.join(roomIdStr);
            const roomState = await getRoomStateFromDB(roomId);
            socket.emit("roomState", roomState);
            const userId = socket.request._id;
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
        const roomIdStr: string = roomId.toString();
        socket.leave(roomIdStr);
        const userId = socket.request._id;
        socket.to(roomIdStr).emit("userLeft", userId);
    });
};