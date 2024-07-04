const { Router } = require("express");
const { auth } = require("../middleware/authMiddleware");

const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
} = require("../controllers/bookingController");

const router = Router();

// get booking
router.get("/", auth, getBookings);

// get single booking
router.get("/:id", getBooking);

// create booking
router.post("/", createBooking);

// update booking
router.put("/:id", auth, updateBooking);

//delete booking
router.delete("/:id", auth, deleteBooking);

module.exports = router;
