import { getRoomStateFromDB } from "../services/roomService.js";

export default function handleRoomSockets(io, socket) {
    socket.on("joinRoom", async ({ roomId, userId }) => {
        socket.join(roomId);

        const roomState = await getRoomStateFromDB(roomId);

        socket.emit("roomState", roomState);

        socket.to(roomId).emit("userJoined", userId);
    });

    socket.on("leaveRoom", ({ roomId, userId }) => {
        socket.leave(roomId);
        socket.to(roomId).emit("userLeft", userId);
    });
};