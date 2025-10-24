import { Types } from "mongoose";
import Room, { RoomModel } from "../models/roomModel";

export const getRoomStateFromDB = async(roomId: Types.ObjectId): Promise<RoomModel> => {
    const room = await Room.findById(roomId);

    if (!room) {
        throw new Error("Room not found");
    }

    return {
       canvasData: room.canvasData,
       participants: room.participants,
       chatHistory: room.chatHistory.slice(0, 50),
       createdAt: room.createdAt,
       updatedAt: room.updatedAt,
       name: room.name,
       owner: room.owner
   };
};