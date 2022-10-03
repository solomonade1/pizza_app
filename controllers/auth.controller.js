const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const { createError } = require("../utils/error");

const register = async (req, res, next) => {
  const body = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);

    const newUser = new User({
      username: body.username,
      email: body.email,
      phone: body.phone,
      password: hash,
    });

    await newUser.save();
    res
      .status(200)
      .json({ status: true, message: "User has been Created successfully" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.findOne({ username: body.username });
    if (!user) return next(createError(404, "User not Found!"));

    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(404, "Wrong Password or Username"));
    const token = jwt.sign(
      {
        id: user._id,
        user_type: user.user_type,
      },
      process.env.JWT_TOKEN
    );

    const { password, user_type, ...otherDetails } = user._doc;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send(otherDetails);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
