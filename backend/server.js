import connectDB from "./config/db.js";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import swaggerDocs from "./config/swagger.js";
import config from "./config/config.js";
const PORT = config.port;
const URL = config.url;
const MONGO_URI = config.mongoUri;
connectDB(MONGO_URI);
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

swaggerDocs(app, URL, PORT);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));