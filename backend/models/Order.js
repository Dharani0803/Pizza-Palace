const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName: String,

    email: String,

    items: Array,

    totalAmount: Number,

    address: String,

    paymentMethod: String,

    status: {
        type: String,
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Order",
    orderSchema
);