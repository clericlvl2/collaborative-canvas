import { Types } from "mongoose";
import { handleNewChatMessage } from "../services/chatService.js";
import { Server } from 'socket.io';
import { logError } from "../utils/errorProcessor.js";
import { CustomSocket } from "./index.js";

export default function handleChatSockets(io: Server, socket: CustomSocket): void {
    socket.on("chatMessage", async ({ roomId, message }: { roomId: Types.ObjectId, message: string }) => { 
        try {
            const userId = socket.request._id as Types.ObjectId;
            const messageData = await handleNewChatMessage(roomId, message, userId);
            const roomIdStr = roomId.toString();
            socket.to(roomIdStr).emit("chatMessage", messageData);
        }
        catch (error: unknown) {
            logError(error, "Error sending chat message: ");
            if (error instanceof Error) {
                socket.emit("exception", error.message);
            }
        }
    });
};