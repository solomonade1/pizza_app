const express = require("express");

const cookieParser = require("cookie-parser")

const { connectToMongoDB } = require("./config/db");
const orderRoute = require("./routes/order.route");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
connectToMongoDB();

// MIDDLEWARES

app.use(express.json());
app.use(cookieParser());
app.use("/api/order", orderRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

// Error middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  console.log("Listening on port, ", PORT);
});
