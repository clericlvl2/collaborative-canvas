import Room from "../models/roomModel.js";

export const handleNewChatMessage = async(roomId, messageData) => {
    try {
        const room = await Room.findById(roomId);

        if (!room) {
            throw new Error("Room not found");
        }
        
        const newMessage = {
            message: messageData.text,
            sender: messageData.senderId
        };

        room.chatHistory.push(newMessage);

        await room.save();

        return newMessage;
    }
    catch (error) {
        console.error("Error saving chat message: ", error.message);
        throw error;
    }
};