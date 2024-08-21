import Room from "../models/roomModel.js";

export async function createRoom(req, res) {
    try {
        const { name } = req.body;
        const ownerId = req._id;

        const newRoom = new Room({
            name,
            owner: ownerId,
            participants: [ownerId]
        });

        await newRoom.save();
        res.status(201).json(newRoom);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Failed to create room");
    }
};