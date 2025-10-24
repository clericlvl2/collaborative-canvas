import { Types } from 'mongoose';
import { Server, Socket } from 'socket.io';

interface CanvasMessage {
    roomId: Types.ObjectId;
    canvasData: string;
}

export default function setupCanvasSockets(io: Server, socket: Socket) {
    socket.on("canvasAction", ({ roomId, canvasData }: CanvasMessage) => {
        socket.to(roomId.toString()).emit("canvasAction", canvasData);
    });
};