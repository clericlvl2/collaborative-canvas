import { Types } from "mongoose";
import { handleNewChatMessage } from "../services/chatService.js";
import { Server, Socket } from 'socket.io';
import { ChatMessageModel } from "../models/roomModel.js";

export default function handleChatSockets(io: Server, socket: Socket): void {
    socket.on("chatMessage", async ({ roomId, messageData }: { roomId: Types.ObjectId, messageData: ChatMessageModel } ) => { 
        try {
            await handleNewChatMessage(roomId, messageData);
            const roomIdStr = roomId.toString();
            socket.to(roomIdStr).emit("chatMessage", messageData);
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            else {
                console.error("Unknown error occured");
            }
            socket.emit("error", "Could not save message");
        }
    });
};