module.exports = {
  multipleMongooseObject: (obj) => obj.map((item) => item.toObject()),

  mongooseObject: (obj) => obj.toObject(),
};
