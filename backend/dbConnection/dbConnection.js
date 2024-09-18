require("dotenv").config()
const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/******************************** Events of mongoose connection. ******************************************************/

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' );
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0); // Exit the application
  });
});

