const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
  {
    name: { type: String },
    description: { type: String },
    image: { type: String },
    videoId: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    level: { type: String },
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true });

module.exports = mongoose.model('Course', Course);
