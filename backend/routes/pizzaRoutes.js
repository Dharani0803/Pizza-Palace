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


// GET
router.get("/", getPizzas);


// POST
router.post("/", addPizza);


// UPDATE
router.put("/:id", updatePizza);


// DELETE
router.delete("/:id", deletePizza);


module.exports = router;