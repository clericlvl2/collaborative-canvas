import { Types } from 'mongoose';
import { Server, Socket } from 'socket.io';

interface CanvasMessage {
    roomId: Types.ObjectId;
    canvasData: string;
}

export default function handleCanvasSockets(io: Server, socket: Socket) {
    socket.on("canvasAction", (data: CanvasMessage) => {
        socket.to(data.roomId.toString()).emit("canvasAction", data.canvasData);
    });
};