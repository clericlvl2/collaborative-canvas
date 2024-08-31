import { Server } from "socket.io";
import { createServer } from "http";
import { expect } from "chai";
import ioClient from "socket.io-client";
import handleRoomSockets from "../sockets/roomSocket.js";

describe("Socket.io Room Sockets", () => {
    let io, serverSocket, clientSocket;

    before((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = ioClient(`http://localhost:${port}`);

            io.on("connection", (socket) => {
                serverSocket = socket;
                handleRoomSockets(io, socket);
            });

            clientSocket.on("connect", done);
        });
    });

    it("should join a room", (done) => {
        const roomId = "123";
        const userId = "456";

        clientSocket.emit("joinRoom", { roomId, userId });

        serverSocket.on("joinRoom", (data) => {
            expect(data).to.eql({ roomId, userId });
            done();
        });
    });

    it("should leave a room", (done) => {
        const roomId = "123";
        const userId = "456";

        clientSocket.emit("leaveRoom", { roomId, userId });

        serverSocket.on("leaveRoom", (data) => {
            expect(data).to.eql({ roomId, userId });
            done();
        });
    });

    after(() => {
        io.close();
        clientSocket.close();
    });
});