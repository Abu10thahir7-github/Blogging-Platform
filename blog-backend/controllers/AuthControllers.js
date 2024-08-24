const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// Register User
const registerUser = async (req, res) => {
    const { username, name, email, password, phone } = req.body;
  
    try {
      const existingUser = await UserModel.findOne({ email: email });
      if (existingUser) {
        return res.status(409).json({ status: "error", message: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        username, // Include username in the new user object
        name,
        email,
        password: hashedPassword,
        phone,
      });
      await user.save();
  
      res.json({ status: "success" });
      console.log("Registration Success");
    } catch (err) {
      console.error("Error during user registration:", err);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };
  
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
          const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token, { httpOnly: true });
  
          return res.json({
            status: "success",
            role: user.role,
            name: user.name,
            userId: user._id,
            phone: user.phone,
          });
          console.log("login success");
        } else {
          return res
            .status(401)
            .json({ status: "error", message: "Incorrect password" });
        }
      } else {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }
    } catch (err) {
      console.error("Error during login:", err);
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  };
module.exports = { registerUser, loginUser }