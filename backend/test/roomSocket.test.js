import { Server } from "socket.io";
import { createServer } from "http";
import { expect } from "chai";
import ioClient from "socket.io-client";
import setupRoomSockets from "../src/sockets/roomSocket.js";

// TODO modules
// TODO mongoose objectid
describe("Socket.io Room Sockets", function() {
    let io, serverSocket, clientSocket;

    before(function(done) {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = ioClient(`http://localhost:${port}`);

            io.on("connection", (socket) => {
                serverSocket = socket;
                setupRoomSockets(io, socket);
            });

            clientSocket.on("connect", done);
        });
    });

    it("should join a room", function(done) {
        const roomId = "123";
        const userId = "456";

        clientSocket.emit("joinRoom", { roomId, userId });

        serverSocket.on("joinRoom", (data) => {
            expect(data).to.eql({ roomId, userId });
            done();
        });
    });

    it("should leave a room", function(done) {
        const roomId = "123";
        const userId = "456";

        clientSocket.emit("leaveRoom", { roomId, userId });

        serverSocket.on("leaveRoom", (data) => {
            expect(data).to.eql({ roomId, userId });
            done();
        });
    });

    after(function() {
        io.close();
        clientSocket.close();
    });
});