import { Types } from "mongoose";
import { handleNewChatMessage } from "../services/chatService.js";
import { Server } from 'socket.io';
import { logError } from "../utils/errorProcessor.js";
import type { TSocket } from './types.js';

interface IAckCallbackPayload {
  result: 'success' | 'error';
}

interface IChatMessageEventPayload {
    roomId: Types.ObjectId,
    message: string
}

export default function setupChatSockets(io: Server, socket: TSocket): void {
    socket.on("chatMessage", async (
        payload: IChatMessageEventPayload,
        ackCallback: (payload: IAckCallbackPayload) => void
    ) => {
        try {
            const { roomId, message } = payload;
            const userId = socket.data.userId as Types.ObjectId;
            const username = socket.data.username as string;

            const messageData = await handleNewChatMessage({
                roomId,
                message,
                senderName: username,
                sender: userId
            });

            const roomIdStr = roomId.toString();

            socket.to(roomIdStr).emit("chatMessage", messageData);
            ackCallback({ result: 'success' })
        }
        catch (error: unknown) {
            logError(error, "Error sending chat message: ");
            ackCallback({ result: 'error' })

            if (error instanceof Error) {
                socket.emit("exception", error.message);
            }
        }
    });
};