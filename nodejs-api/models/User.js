const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  authType: {
    type: String,
    default: 'local',
    enum: ['local', 'google', 'facebook'],
  },

  authSocialID: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: this.authType === 'local' ? true : false,
  },

  decks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Deck',
    },
  ],
});

UserSchema.pre('save', async function (next) {
  try {
    if (this.authType !== 'local') return next();

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Generate a password hash (salt + hash)
    const passwordHashed = await bcrypt.hash(this.password, salt);
    // Re-assign password had hash
    this.password = passwordHashed;

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
