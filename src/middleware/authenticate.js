const authenticate = async (req, res, next) => {
  // Bearer token
  try {
    const token = req.headers.authorization?.splite(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }
    const userId = getUserIdFromToken(token);
    const user = userService.findUserById(userId);

    req.user = user;
  } catch (error) {
    return res.send({ error: error.message });
  }

  next();
};

module.exports = authenticate;
