const User = require('../models/User');
const Deck = require('../models/Deck');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/env');

const encodedToken = (userId) => {
  return JWT.sign(
    {
      iss: 'Le Dung',
      sub: userId,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    `${JWT_SECRET}`
  );
};

const authFacebook = async (req, res, next) => {
  const token = encodedToken(req.user._id);

  res.setHeader('Authorization', token);
  return res.status(200).json({ success: true });
};

const authGoogle = async (req, res, next) => {
  const token = encodedToken(req.user._id);

  res.setHeader('Authorization', token);
  return res.status(200).json({ success: true });
};

const signIn = async (req, res, next) => {
  const token = encodedToken(req.user._id);

  res.setHeader('Authorization', token);
  return res.status(200).json({ success: true });
};

const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if there is a user with the same email
    const checkUser = await User.findOne({ email });
    if (checkUser) return res.status(403).json({ error: { message: 'Email is already being used!' } });

    const newUser = new User({ firstName, lastName, email, password });

    await newUser.save();

    // endcode a token
    const token = encodedToken(newUser._id);

    res.setHeader('Authorization', token);
    return res.status(201).json({ message: 'Sign up successfully!' });
  } catch (error) {
    next(error);
  }
};

const secret = async (req, res, next) => {
  return res.status(200).json({ resource: true });
};

const index = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) =>
      res.status(201).json({
        user,
      })
    )
    .catch(next);
};

const getInfo = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => res.status(200).json(user))
    .catch(next);
};

const replaceUser = (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).json({ success: true }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body)
    .then(() => res.status(200).json({ success: true }))
    .catch(next);
};

// User Decks
const createDeck = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newDeck = new Deck(req.body);

    const user = await User.findById(id);
    newDeck.owner = user;

    await newDeck.save();

    user.decks.push(newDeck._id);
    await user.save();

    res.status(201).json(newDeck);
  } catch (error) {
    next(error);
  }
};

const Decks = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .populate('decks')
    .then((user) => res.status(200).json({ decks: user.decks }))
    .catch(next);
};

module.exports = {
  index,
  createUser,
  getInfo,
  replaceUser,
  updateUser,
  createDeck,
  Decks,
  signIn,
  signUp,
  secret,
  authGoogle,
  authFacebook,
};
