import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { swaggerDocs } from "./config/swagger.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
swaggerDocs(app, PORT);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));