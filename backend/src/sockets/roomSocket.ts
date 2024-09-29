import { Types } from 'mongoose';
import { getRoomStateFromDB } from '../services/roomService.js';
import { Server, Socket } from 'socket.io';

export default function handleRoomSockets(io: Server, socket: Socket) {
    socket.on("joinRoom", async ({ roomId, userId }: { roomId: Types.ObjectId, userId: Types.ObjectId }): Promise<void> => {
        const roomIdStr: string = roomId.toString();
        socket.join(roomIdStr);

        const roomState = await getRoomStateFromDB(roomId);

        socket.emit("roomState", roomState);

        socket.to(roomIdStr).emit("userJoined", userId);
    });

    socket.on("leaveRoom", ({ roomId, userId }: { roomId: Types.ObjectId, userId: Types.ObjectId }): void => {
        const roomIdStr: string = roomId.toString();
        socket.leave(roomIdStr);
        socket.to(roomIdStr).emit("userLeft", userId);
    });
};