const Order = require("../models/Order");

const getOrders = async (req, res) => {

    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



const placeOrder = async (req, res) => {

    try {
        const order = await Order.create(
            req.body
        );
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};



const updateOrderStatus = async (req, res) => {

    try {
        const updatedOrder =
            await Order.findByIdAndUpdate(
                req.params.id,
                {
                    status: req.body.status
                },

                { new: true }
            );
        res.json(updatedOrder);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getOrders,
    placeOrder,
    updateOrderStatus
};