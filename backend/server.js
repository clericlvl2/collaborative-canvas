import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import swaggerDocs from "./config/swagger.js";
import config from "./config/env.js";
import setupSockets from "./sockets/index.js";

const URL = config.url;
const MONGO_URI = config.mongoUri;

connectDB(MONGO_URI);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/rooms", roomRoutes);

setupSockets(io);

swaggerDocs(app, URL);

export default app;