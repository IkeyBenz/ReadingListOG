const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || 'mongodb://localhost/readinglist';

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('Error connecting to the Database:', err);
  } else {
    console.log('Connected to Database');
  }
});

mongoose.connection.on('error', error => console.error.bind(console, error));


module.exports = mongoose.connection;
