import { Types } from "mongoose";
import Room, { ChatMessageModel } from "../models/roomModel";

interface INewMessageHandlerParams{
    roomId: Types.ObjectId;
    message: string ;
    sender: Types.ObjectId;
    senderName: string;
}

export const handleNewChatMessage = async({
    roomId,
    message,
    sender,
    senderName,
}: INewMessageHandlerParams): Promise<ChatMessageModel> => {
    const room = await Room.findById(roomId);

    if (!room) {
        throw new Error("Room not found");
    }

    const messageData: ChatMessageModel = {
        message,
        sender,
        senderName
    };

    room.chatHistory.push(messageData);
    await room.save();

    return messageData;
};