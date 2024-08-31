import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createRoom, getRooms } from "../controllers/roomController.js";

const router = express.Router();

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     description: Allows an authenticated user to create a new room.
 *     tags: 
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My New Room"
 *                 description: The name of the room.
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the created room.
 *                 name:
 *                   type: string
 *                   description: The name of the created room.
 *                 owner:
 *                   type: string
 *                   description: The ID of the room owner.
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: The IDs of the room participants.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The creation date of the room.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The last update date of the room.
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Server error
 */
router.post("", protect, createRoom);


/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get a list of all rooms
 *     description: Retrieve a list of all rooms from the database.
 *     tags: 
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   owner:
 *                     type: string
 *                   participants:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
router.get("", protect, getRooms);

export default router;