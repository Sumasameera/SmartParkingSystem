const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose")
const express = require("express");
// const connectDB = require('./config/db.config');
const app = express();
const bodyParser = require("body-parser");
// const { connectDB } = require("./config/db.config");
const userRouter = require("./controllers/user");
const handleError = require('./utils/errorHandler');
const { isLoggedIn } = require("./controllers/middleware");
const parkingRouter = require("./controllers/parking");
const paymentMethodRouter = require("./controllers/paymentMethod");
const bookingRouter = require("./controllers/booking");
const spaceRouter = require("./controllers/spaceRouter");
const cors = require('cors');
const reviewRouter = require("./controllers/review");

// connectDB();


// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 5000;

app.use(cors())

// Connect Database
// connectDB();


app.get('/', isLoggedIn, async (req, res) => {
    res.json({ message: 'Hello world!'})
})

app.use("/user", userRouter)
app.use("/parking", parkingRouter)
app.use("/paymentMethod", paymentMethodRouter)
app.use("/booking", bookingRouter)
app.use("/space", spaceRouter)
app.use("/review", reviewRouter)

// Error handler

app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    handleError(error, res);
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Database connected and Server Started!", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
