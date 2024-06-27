const Room = require("../models/roomModel");

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

// Create room
const createRoom = async (req, res, next) => {
  try {
    const room = new Room(req.body);
    await room.validate(); // Validazione prima di salvare

    const savedRoom = await room.save();
    return res.status(201).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

// get single room
const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      res.status(400);
      throw new Error("room non trovata");
    }

    return res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

// update rooms
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true } // Esegui validazione durante l'update
    );

    if (!updatedRoom) {
      res.status(400);
      throw new Error("Non puoi caricare la stanza");
    }

    return res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      res.status(400);
      throw new Error("Stanza cancellata");
    }

    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
};
