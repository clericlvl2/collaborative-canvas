import { Types } from "mongoose";
import Room, { RoomModel } from "../models/roomModel.js";

export const getRoomStateFromDB = async(roomId: Types.ObjectId): Promise<RoomModel> => {
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
        updatedAt: room.updatedAt,
        name: room.name,
        owner: room.owner
    };

    return roomState;

};