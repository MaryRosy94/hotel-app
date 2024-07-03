const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// create user
const createUser = async (req, res, next) => {
  try {
    const { email, password, ...rest } = req.body;

    // Check se l email già esiste
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email già in uso" });
    }

    // generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      ...rest,
      email,
      password: hashedPassword,
    });

    // Exclude password from the response
    const { password: userPassword, ...otherDetails } = user._doc;

    return res.status(201).json(otherDetails);
  } catch (error) {
    next(error);
  }
};

// login User
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Ottieni l'utente dal database
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("user non trovato");
    }

    //confronta la password

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      res.status(400);
      throw new Error("password non corretta");
    }

    // generate token set
    // set cookie
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    res.cookie("jwt", token);

    const { password: userPassword, ...rest } = user._doc;
    return res.status(200).json({
      ...rest,
    });
  } catch (error) {
    next(error);
  }
};

// logout User
const logoutUser = async (req, res, next) => {
  res.cookie("jwt", " ", { expiresIn: "-1" });
  return res.json({ message: "sei stato disconnesso" });
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
};
