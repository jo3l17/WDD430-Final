const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const userController = {
  // signup
  signup: async (req, res) => {
    const { password, email } = req.body;
    if(password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long"
      });
    }
    const cryptedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ password: cryptedPassword, email });
    try {
      await user.save();
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || "secret",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ token });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: "User already exists" });
      }
      return res.status(400).json({ message: err.message });
    }
  },
  // login
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ token });
  },
};

module.exports = userController;
