import express, { Application } from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import config from "./config/env.js";
import setupSockets from "./sockets/index.js";
import setupCors from "./config/cors.js";
import swaggerDocs from "./config/swagger.js";

const MONGO_URI: string = config.mongoUri;
const IO_PORT: number = config.ioPort;

connectDB(MONGO_URI);

const app: Application = express();

setupCors(app);
setupSockets(app, IO_PORT);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

swaggerDocs(app);

export default app;
