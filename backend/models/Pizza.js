const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  category: String,
  isVeg: Boolean,
  description: String,
});

// ✅ THIS IS THE FIX (prevents overwrite error)
const Pizza =
  mongoose.models.Pizza || mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;