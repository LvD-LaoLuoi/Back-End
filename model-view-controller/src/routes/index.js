const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const coursesRouter = require('./courses');

function route(app) {
  // Me stored courses
  app.use('/me', meRouter);

  // Course detail
  app.use('/courses', coursesRouter);

  // New page
  app.get('/news/:slug', newsRouter);

  app.get('/news', newsRouter);

  // Search page
  app.get('/search', siteRouter);

  // Home page
  app.get('/', siteRouter);
}

module.exports = route;
