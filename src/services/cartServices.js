const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Food = require("../models/food.model.js");

module.exports = {
  async createCart(user) {
    const cart = new Cart({ customer: user });
    const createCart = await cart.save();
    return createCart;
  },

  async findCartByUserId(userId) {
    let cart;

    cart = await Cart.findOne({ customer: userId }).populate([
      {
        path: "items",
        populate: {
          path: "food",
          populate: { path: "restaurant", select: "_id" },
        },
      },
    ]);
    if (!cart) {
      throw new Error("Cart not found u - ", userId);
    }

    let cartItems = await CartItem.find({ cart: cart._id }).populate("food");

    console.log("cartItems", cartItems);

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (const item of cart.items) {
      totalPrice += item.price;
      totalDiscountedPrice += item.discountedPrice;
      totalItem += item.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.totalItem = totalItem;

    // const updateCart = await cart.save();
    return cart;
  },

  async addItemToCart(req, res) {
    const cart = await Cart.findOne({ customer: userId });
    const food = await Food.findById(req.menuItemId);

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      food: food._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        food: food._id,
        cart: cart._id,
        quantity: 1,
        userId,
        totalPrice: food.price,
      });

      const createCartItem = await cartItem.save();
      cart.items.push(createCartItem);
      await cart.save();
      return createCartItem;
    }
    return isPresent;
  },

  async updateCartItemQauntity(cartItemId, quantity) {
    const cartItem = await CartItem.findById(cartItemId).populate([
      { path: "food", populate: { path: "restaurant", select: "_id" } },
    ]);
    if (!cartItem) {
      throw new Error(`Cart item not found with ID ${cartItemId}`);
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = quantity * cartItem.food.price;
    await cartItem.save();
    return cartItem;
  },

  async removeItemFromCart(cartItemId, user) {
    //Retrive user ID from JWT Token

    // Find the cart for the user
    const cart = await Cart.findOne({ customer: user._id });
    if (!cart) {
      throw new Error(`Cart not found with user ID ${user._id}`);
    }

    //Remove the item from the cart
    cart.items = cart.items.filter((item) => !item.equals(cartItemId));
    await cart.save();
    return cart;
  },

  async clearCart(user) {
    const cart = await Cart.findOne({ customer: user._id });
    if (!cart) {
      throw new Error(`Cart not found with user ID ${user._id}`);
    }

    cart.tems = [];
    await cart.save();
    return cart;
  },

  async calculateCartTotals(cart) {
    try {
      let total = 0;

      for (let cartItem of cart.items) {
        total += cartItem.food.price * cartItem.quantity;
      }
      return total;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
