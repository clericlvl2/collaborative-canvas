export default function handleCanvasSockets(io, socket) {
    socket.on("canvasAction", (data) => {
        socket.to(data.roomId).emit("canvasAction", data);
    });
};