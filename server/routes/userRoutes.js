const { Router } = require("express");
const { auth } = require("../middleware/authMiddleware");
const {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

const router = Router();

//get all users
router.get("/", auth, getUsers);

//create users
router.post("/", createUser);

//login user
router.post("/login", loginUser);

//logout user
router.get("/logout", logoutUser);

module.exports = router;
