const cartService = require("../services/cartServices");

const addItemToCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartService.addItemToCart(req.body, user._id);
    res.status(201).json(cart);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const updateCartItemQauntity = async (req, res) => {
  try {
    const { cartItemId, qauntity } = req.body;
    const cart = await cartService.updateCartItemQauntity(cartItemId, qauntity);
    res.status(200).json(cart);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const cart = await cartService.removeItemFromCart(id, user);
    res.status(200).json(cart);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const calculateCartTotals = async (req, res) => {
  try {
    const { cartId } = req.query;
    const user = req.user;
    const cart = await cartService.findCartByUserId(user.getId());
    const total = cartService.calculateCartTotals(cart);
    res.status(200).json(total);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const findUserCart = async (req, res) => {
  try {
    const user = req.user;
    console.log("req user", req.user);
    const cart = await cartService.findCartByUserId(user._id.toString());
    res.status(200).json(cart);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const clearCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartService.clearCart(user);
    res.status(200).json(cart);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = {
  addItemToCart,
  updateCartItemQauntity,
  removeItemFromCart,
  calculateCartTotals,
  findUserCart,
  clearCart,
};
