export default function handleRoomSockets(io, socket) {
    socket.on("joinRoom", ({ roomId, userId }) => {
        socket.join(roomId);
        io.to(roomId).emit("userJoined", userId);
    });

    socket.on("leaveRoom", ({ roomId, userId }) => {
        socket.leave(roomId);
        io.to(roomId).emit("userLeft", userId);
    });
};