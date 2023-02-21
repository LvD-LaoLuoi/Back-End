require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./configs/db/index');

// Connect to DB
db.connect();

// methodOverride
app.use(methodOverride('_method'));

// static path setting
app.use('/', express.static(path.join(__dirname, '/public')));

// Middleware solve data send from browser by post method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './resources/views'));

// Routing
route(app);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
