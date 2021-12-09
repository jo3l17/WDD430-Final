const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userController = {
  // signup
  signup: async (req, res) => {
    const { password, email } = req.body;
    const user = new User({ password, email });
    try {
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (err) {
      if(err.code === 11000) {
        res.status(409).json({ message: "User already exists" });
      }
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userController;
