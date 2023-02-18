const mongoose = require('mongoose');

async function connect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
      'mongodb+srv://somehow:binhyen1991@cluster0.4i9h2lh.mongodb.net/f8_education_dev?retryWrites=true&w=majority'
    );
    console.log('connect to success');
  } catch (err) {
    console.log('failure connect to server :', err.message);
  }
}

module.exports = { connect };
