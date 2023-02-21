const mongoose = require('mongoose');

async function connect() {
  await mongoose
    .set('strictQuery', false)
    .connect(
      `mongodb+srv://${process.env.ID}:${process.env.PASSWORD}@cluster0.chvxvlc.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    )
    .then(() => console.log('Connected to mongodb server!'))
    .catch((error) => console.error('The connection to the database failed with an error, which is: ', error.message));
}

module.exports = { connect };
