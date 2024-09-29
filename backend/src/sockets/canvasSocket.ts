import { Types } from 'mongoose';
import { Server, Socket } from 'socket.io';

interface ICanvasMessage {
    roomId: Types.ObjectId,
    canvasData: string
}

export default function handleCanvasSockets(io: Server, socket: Socket) {
    // TODO: declare data type
    socket.on("canvasAction", (data: ICanvasMessage) => {
        socket.to(data.roomId.toString()).emit("canvasAction", data.canvasData);
    });
};