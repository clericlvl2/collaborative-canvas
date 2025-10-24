import { test, before, after } from "node:test";
import { deepStrictEqual } from "node:assert";
import { Server, type Socket } from 'socket.io';
import { createServer } from "http";
import ioClient from "socket.io-client";
import setupRoomSockets from "../src/sockets/roomSocket";

// TODO mongoose objectid
test("Socket.io Room Sockets", async (t) => {
    let io: Server;
    let serverSocket: Socket;
    let clientSocket: ReturnType<typeof ioClient>;

    before(async () => {
        const httpServer = createServer();
        io = new Server(httpServer);

        await new Promise<void>((resolve) => {
            httpServer.listen(() => {
                const address = httpServer.address();
                const port = typeof address === 'string' ? address : (address?.port ?? '');

                clientSocket = ioClient(`http://localhost:${port}`);

                io.on("connection", (socket) => {
                    serverSocket = socket;
                    setupRoomSockets(io, socket);
                });

                clientSocket.on("connect", () => resolve());
            });
        });
    });

    after(() => {
        io?.close();
        clientSocket?.close();
    });

    await t.test("should join a room", async () => {
        const roomId = "123";
        const userId = "456";

        const promise = new Promise<void>((resolve) => {
            serverSocket.on("joinRoom", (data) => {
                deepStrictEqual(data, { roomId, userId });
                resolve();
            });
        });

        clientSocket.emit("joinRoom", { roomId, userId });
        await promise;
    });

    await t.test("should leave a room", async () => {
        const roomId = "123";
        const userId = "456";

        const promise = new Promise<void>((resolve) => {
            serverSocket.on("leaveRoom", (data) => {
                deepStrictEqual(data, { roomId, userId });
                resolve();
            });
        });

        clientSocket.emit("leaveRoom", { roomId, userId });
        await promise;
    });
});