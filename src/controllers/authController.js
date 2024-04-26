const { generateToken } = require("../config/jwtProvider");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const jwt = await generateToken(user._id);
    // await cartService.createCart(user);
    return res.status(201).send({ jwt, message: "Registration successful" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (user) {
      if (isPasswordValid) {
        const jwt = await generateToken(user._id);
        return res.status(200).send({ jwt, message: "Login success" });
      }
      return res.status(401).send({ message: "Incorrect password" });
    }
    return res.status(404).send({ message: "User not found" });
  } catch (error) {}
};

module.exports = {
  register,
  login,
};
