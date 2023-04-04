const express = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/memberController');
//const {isGuest, isLoggedIn} = require('../middleware/auth');
//const {logInLimiter} = require('../middleware/rateLimiters');

const router = express.Router();

router.get('/signup', controller.new);

router.post('/', controller.create);

router.get('/login', controller.getUserLogin);

router.get('/faq', controller.faq);

router.get('/logout', controller.logout);

module.exports = router;