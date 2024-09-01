import { handleNewChatMessage } from "../services/chatService.js";

export default function handleChatSockets(io, socket) {
    socket.on("chatMessage", async ({ roomId, messageData }) => { 
        try {
            const newMessage = await handleNewChatMessage(roomId, messageData);

            socket.to(roomId).emit("chatMessage", newMessage);
        }
        catch (error) {
            socket.emit("error", "Could not save message");
        }
    });
};