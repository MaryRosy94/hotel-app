const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const bookingRoutes = require("./routes/bookingRoutes");

const port = process.env.PORT || 5000;

//connect to database
connectDB();

// setup middlewares
app.use(express.json());

// setup routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Ascolto sulla porta ${port}`));
