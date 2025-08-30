// db.config.js
const mongoose = require('mongoose');
require('dotenv').config()
// const logger = require('../logger/api.logger');


const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://sameera:sameera@cluster0.lkntvho.mongodb.net/fieldproject?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;