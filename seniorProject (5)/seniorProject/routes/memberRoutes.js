const express = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/memberController');
//const {isGuest, isLoggedIn} = require('../middleware/auth');
//const {logInLimiter} = require('../middleware/rateLimiters');

const router = express.Router();

// GET calls: Loads the pages
router.get('/signup', controller.new);
router.get('/login', controller.getUserLogin);
router.get('/slides', controller.slides);
router.get('/logout', controller.logout);
router.get('/faq', controller.faq);

// POST calls: Uses/creates data from/for database
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/', controller.create);

module.exports = router;
