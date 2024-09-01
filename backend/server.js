import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import swaggerDocs from "./config/swagger.js";
import config from "./config/env.js";
import setupSockets from "./sockets/index.js";

const URL = config.url;
const MONGO_URI = config.mongoUri;
const IO_PORT = config.ioPort;

connectDB(MONGO_URI);

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/rooms", roomRoutes);

setupSockets(app, IO_PORT);
swaggerDocs(app, URL);

export default app;