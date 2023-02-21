require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoClient = require('./configs/db/index');

// setup connect mongodb
mongoClient.connect();

// initial app
const app = express();

const userRoute = require('./routes/user');
const deckRoute = require('./routes/deck');

// Middleware
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res, nex) => {
  return res.status(200).json({
    message: 'Server is OK!',
  });
});

// specify routes
app.use('/users', userRoute);
app.use('/decks', deckRoute);

// Catch 404 errors and forward them to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handler function
app.use(() => {
  const error = app.get('env') === 'development' ? err : {};
  const status = error.status || 500;

  // response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
const port = app.get('port') || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
