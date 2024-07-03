const Booking = require("../models/bookingModel");

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("roomId");
    if (!bookings) {
      res.status(400);
      throw new Error("Non riesco a trovare la prenotazione");
    }

    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// create booking
const createBooking = async (req, res, next) => {
  try {
    const booking = new Booking(req.body);
    await booking.validate(); // Validazione prima di salvare
    const savedBooking = await booking.save();

    return res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true, // Assicura la validazione durante l'aggiornamento
      }
    );

    if (!updatedBooking) {
      res.status(400);
      throw new Error("Non posso creare la prenotazione");
    }
    const bookings = await Booking.find();
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const room = await Booking.findByIdAndDelete(req.params.id);
    if (!room) {
      res.status(400);
      throw new Error("Non si può cancellare la prenotazione");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

//get singel booking
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("roomId");
    if (!booking) {
      res.status(400);
      throw new Error("Prenotazione non trovata");
    }

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
};
