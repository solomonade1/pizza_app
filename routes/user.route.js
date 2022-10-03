const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} = require("../controllers/user.controller");

const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();


//UPDATE USER
router.put("/:id", verifyUser, updateUser);

//DELETE USER
router.delete("/:id", verifyUser, deleteUser);

//GET USER
router.get("/:id", verifyUser, getUser);

// GET ALL USERS
router.get("/", verifyAdmin, getAllUser);

module.exports = router;
