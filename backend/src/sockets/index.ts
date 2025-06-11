import http, { IncomingMessage } from "http";
import { Server, Socket } from "socket.io";
import setupRoomSockets from "./roomSocket.js";
import setupCanvasSockets from "./canvasSocket.js";
import setupChatSockets from "./chatSocket.js";
import { Application } from "express";
import { Types } from "mongoose";
import { protect } from './middleware/protect.js';

export interface CustomSocket extends Socket {
    request: CustomIncomingMessage;
}

export interface CustomIncomingMessage extends IncomingMessage {
    _id?: Types.ObjectId;
}

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