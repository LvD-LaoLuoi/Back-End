class NewsController {
  index(req, res) {
    // [GET] /news
    res.render('news');
  }

  show(req, res) {
    res.send('show!');
  }
}

module.exports = new NewsController();
