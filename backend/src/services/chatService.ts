import { Types } from "mongoose";
import Room, { ChatMessageModel } from "../models/roomModel.js";

export const handleNewChatMessage = async(roomId: Types.ObjectId, messageData: ChatMessageModel): Promise<void> => {
    try {
        const room = await Room.findById(roomId);

        if (!room) {
            throw new Error("Room not found");
        }

        room.chatHistory.push(messageData);

        await room.save();
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error saving chat message: ", error.message);
        }
        else {
            console.error("Unknow error occured");
        }
        throw error;
    }
};