import Room from "../models/roomModel.js";

export const getRoomStateFromDB = async(roomId) => {
    try {
        const room = await Room.findById(roomId);

        if (!room) {
            throw new Error("Room not found");
        }

        const roomState = {
            canvasData: room.canvasData,
            participants: room.participants,
            chatHistory: room.chatHistory.slice(0, 50),
            roomName: room.name,
            createdAt: room.createdAt,
            roomOwner: room.owner,
            updatedAt: room.updatedAt
        };

        return roomState;
    }
    catch (error) {
        console.error("Error fetching room state:", error.message);
        throw error;
    }
};