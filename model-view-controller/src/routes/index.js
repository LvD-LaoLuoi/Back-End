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
  app.use('/news', newsRouter);

  // Search page
  app.use('/search', siteRouter);

  // Home page
  app.use('/', siteRouter);
}

module.exports = route;
