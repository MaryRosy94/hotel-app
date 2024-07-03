const { Router } = require("express");

const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
} = require("../controllers/bookingController");

const router = Router();

// get booking
router.get("/", getBookings);

// get single booking
router.get("/:id", getBooking);

// create booking
router.post("/", createBooking);

// update booking
router.put("/:id", updateBooking);

//delete booking
router.delete("/:id", deleteBooking);

module.exports = router;
