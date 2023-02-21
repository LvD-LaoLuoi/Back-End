const express = require('express');
const DeckController = require('../controllers/deck');
const router = express.Router();

router.get('/', DeckController.index);

router.post('/', DeckController.newDeck);

module.exports = router;
