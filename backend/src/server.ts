import express, { Application } from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import roomRoutes from "./routes/roomRoutes";
import Config from "./config/env";
import setupSockets from "./sockets/index";
import setupCors from "./config/cors";
import swaggerDocs from "./config/swagger";

const DB_URI: string = Config.DBUri;
const SOCKET_PORT: number = Config.Port.Socket;

await connectDB(DB_URI);

const app: Application = express();

setupCors(app);
setupSockets(app, SOCKET_PORT);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

swaggerDocs(app);

export default app;
