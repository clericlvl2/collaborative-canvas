import handleRoomSockets from "./roomSocket.js";

export default function setupSockets(io) {
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        handleRoomSockets(io, socket);
        socket.on("disconnect", () => console.log(`User disconnected: ${socket.id}`));
    });
};