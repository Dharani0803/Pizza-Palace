const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  category: String,
  isVeg: Boolean,
  hasSize: Boolean,
  hasCrust: Boolean,
  description: String,
});

const Pizza =
  mongoose.models.Pizza || mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;