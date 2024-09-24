require("dotenv").config();
const mongoose = require('mongoose');

// Connect to MongoDB with options
mongoose.connect(process.env.DB_URL).then(() => {
  console.log('Mongoose default connection open');
}).catch(err => {
  console.error('Mongoose default connection error on startup: ' + err);
});

// Event listeners for Mongoose connection
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + process.env.DB_URL);
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

// Graceful shutdown on app termination
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0); // Exit the application
  });
});
