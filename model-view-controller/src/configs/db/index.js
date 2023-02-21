const mongoose = require('mongoose');

async function connect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
      `mongodb+srv://${process.env.ID}:${process.env.PASSWORD}@cluster0.4i9h2lh.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    );
    console.log('connect to success');
  } catch (err) {
    console.log('failure connect to server :', err.message);
  }
}

module.exports = { connect };
