import http from "http";
import { Server } from "socket.io";
import handleRoomSockets from "./roomSocket.js";
import handleCanvasSockets from "./canvasSocket.js";
import handleChatSockets from "./chatSocket.js";

export default function setupSockets(app, ioPort) {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        handleRoomSockets(io, socket);
        handleCanvasSockets(io, socket);
        handleChatSockets(io, socket);

        socket.on("disconnect", () => console.log(`User disconnected: ${socket.id}`));
    });

    server.listen(ioPort);
    console.log("Socket IO port:", ioPort);
};