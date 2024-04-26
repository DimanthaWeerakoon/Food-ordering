const { default: mongoose } = require("mongoose");

const AddressSchema = new mongoose.Schema({
  fullName: String,
  streerAddress: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
});

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
