const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String
    },

    imageUrl: {
        type: String,
        required: true
    },

    isVeg: {
        type: Boolean,
        default: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model(
    "Pizza",
    pizzaSchema
);

const express = require("express");

const router = express.Router();

const {
    getPizzas,
    addPizza,
    updatePizza,
    deletePizza
} = require("../controllers/pizzaController");

router.get("/", getPizzas);

router.post("/", addPizza);

router.put("/:id", updatePizza);

router.delete("/:id", deletePizza);

module.exports = router;