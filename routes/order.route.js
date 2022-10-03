const express = require("express");

const {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  sortPrice,
  sortDate,
  sortByState,
} = require("../controllers/order.controller");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.get("/", verifyAdmin, getAllOrders);
router.get("/sortprice", verifyAdmin, sortPrice);
router.get("/sortdate", verifyAdmin, sortDate);
router.get("/sortstate", verifyAdmin, sortByState);

router.post("/create", verifyUser, createOrder);
router.get("/:id", verifyUser, getOrderById);
router.put("/:id", verifyUser, updateOrder);
router.delete("/:id", verifyUser, deleteOrder);

module.exports = router;
