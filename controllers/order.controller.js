const moment = require("moment");

const orderModel = require("../models/order.model");

// GET ALL ORDERS
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find().limit(10);

    return res.json({ status: true, orders });
  } catch (err) {
    next(err);
  }
};

// CREATE ORDER
const createOrder = async (req, res, next) => {
  const body = req.body;
  const total_price = body.items.reduce((prev, curr) => {
    prev += curr.price;
    return prev;
  }, 0);
  try {
    const order = await orderModel.create({
      items: body.items,
      created_at: moment().toDate(),
      total_price,
    });
    return res.json({ status: true, order });
  } catch (err) {
    next(err);
  }
};

// GET ORDER BY ID
const getOrderById = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ status: false, order: null });
    return res.json({ status: true, order });
  } catch (err) {
    next(err);
  }
};

// UPDATE ORDER
const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

//DELETE ORDER
const deleteOrder = async (req, res, next) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    res.status(200).json("order has been deleted");
  } catch (err) {
    next(err);
  }
};

// SORT ORDER BY PRICE
const sortPrice = async (req, res, next) => {
  try {
    const sortPrice = await orderModel.find().sort({ total_price: 1 });
    return res.json({ status: true, sortPrice });
  } catch (err) {
    next(err);
  }
};

//SORT ORDER BY DATE
const sortDate = async (req, res, next) => {
  try {
    const sortPrice = await orderModel.find().sort({ created_at: -1 });
    return res.json({ status: true, sortPrice });
  } catch (err) {
    next(err);
  }
};

// SORT ORDER BY STATE
const sortByState = async (req, res, next) => {
  try {
    const sortState = await orderModel.find().sort({ state: -1 });
    return res.json({ status: true, sortState });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  sortPrice,
  sortDate,
  sortByState,
};
