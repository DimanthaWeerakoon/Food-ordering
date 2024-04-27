const { default: mongoose } = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
  },
  quantity: Number,
  ingredients: [String],
  totalPrice: Number,
});

const CartItem = mongoose.model("Cart", CartItemSchema);
module.exports = CartItem;
