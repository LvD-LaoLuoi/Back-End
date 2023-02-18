const Course = require('../models/Course');
const { multipleMongooseObject } = require('../../util/mongoose');

class SitesController {
  home(req, res, next) {
    // [GET] /
    Course.find({})
      .then((courses) => {
        res.render('home', { courses: multipleMongooseObject(courses) });
      })
      .catch(next);
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SitesController();
