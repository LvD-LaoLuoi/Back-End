const User = require('../models/User');
const Deck = require('../models/Deck');

const index = (req, res, next) => {
  Deck.find({})
    .then((decks) => res.status(200).json({ decks }))
    .catch(next);
};

const newDeck = async (req, res, next) => {
  try {
    const owner = await User.findById(req.body.owner);

    const deck = req.body;
    delete deck.owner;

    deck.owner = owner._id;
    const newDeck = new Deck(deck);
    await newDeck.save();

    owner.decks.push(newDeck._id);
    await owner.save();

    return res.status(201).json({ deck: newDeck });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  newDeck,
};
