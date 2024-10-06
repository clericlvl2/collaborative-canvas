import { Types } from "mongoose";
import Room, { ChatMessageModel } from "../models/roomModel.js";

export const handleNewChatMessage = async(roomId: Types.ObjectId, message: string, sender: Types.ObjectId): Promise<ChatMessageModel> => {
    const room = await Room.findById(roomId);

    if (!room) {
        throw new Error("Room not found");
    }
    const messageData: ChatMessageModel = {
        message,
        sender
    };
    room.chatHistory.push(messageData);

    await room.save();
    return messageData;
};