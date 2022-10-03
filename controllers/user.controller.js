const User = require("../models/user.model");

//UPDATE USER
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(err);
  }
};

//DELETE USER
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been Deleted.");
  } catch (error) {
    next(err);
  }
};

//GET USER
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(err);
  }
};

// GET ALL USER
const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateUser,
  getUser,
  getAllUser,
  deleteUser,
};
