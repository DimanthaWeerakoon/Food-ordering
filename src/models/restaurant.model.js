const mongoose = require("mongoose");

const RestaurantSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  description: String,
  cuisineType: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  contactInformation: {},
  openingHours: String,

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  numRatings: Number,
  images: [String],
  registrationDate: {
    type: Date,
    defualt: Date.now,
  },
  open: Boolean,
  foods: [
    {
      tpye: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
