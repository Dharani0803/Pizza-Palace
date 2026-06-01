const Pizza = require("../models/Pizza");


// GET ALL PIZZAS
const getPizzas = async (req, res) => {

    try {
        const pizzas = await Pizza.find();
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// ADD PIZZA
const addPizza = async (req, res) => {

    try {
        const pizza = await Pizza.create(
            req.body
        );
        res.status(201).json(pizza);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// UPDATE PIZZA
const updatePizza = async (req, res) => {

    try {
        const updatedPizza =
            await Pizza.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
        res.json(updatedPizza);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE PIZZA
const deletePizza = async (req, res) => {

    try {
        await Pizza.findByIdAndDelete(
            req.params.id
        );
        res.json({
            message: "Pizza deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getPizzas,
    addPizza,
    updatePizza,
    deletePizza
};