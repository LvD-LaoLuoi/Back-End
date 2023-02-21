const express = require('express');
const UserController = require('../controllers/user');
const passport = require('passport');
const passportConfig = require('../middlewares/passport');
const router = express.Router();

router.post('/auth/google', passport.authenticate('google-token', { session: false }), UserController.authGoogle);
router.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), UserController.authFacebook);

router.post('/signup', UserController.signUp);
router.post('/signin', passport.authenticate('local', { session: false }), UserController.signIn);
router.get('/secret', passport.authenticate('jwt', { session: false }), UserController.secret);

router.post('/create', UserController.createUser);

router.get('/:id/deck', UserController.Decks);
router.post('/:id/deck', UserController.createDeck);

router.get('/:id', UserController.getInfo);
router.put('/:id', UserController.replaceUser);
router.patch('/:id', UserController.updateUser);

router.get('/', UserController.index);

module.exports = router;
