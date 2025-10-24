import http from "http";
import { Server } from "socket.io";
import setupRoomSockets from "./roomSocket";
import setupCanvasSockets from "./canvasSocket";
import setupChatSockets from "./chatSocket";
import { Application } from "express";
import { protect } from './middleware/protect.js';

export default function setupSockets(app: Application, ioPort: number): void {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.use(protect);
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        setupRoomSockets(io, socket);
        setupCanvasSockets(io, socket);
        setupChatSockets(io, socket);

        socket.on("disconnect", () => console.log(`User disconnected: ${socket.id}`));
    });

    server.listen(ioPort, () => {
        console.log(`Socket IO is running on port ${ioPort}`);
    });
};