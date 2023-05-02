const express = require('express');
const controller = require('../controllers/workoutController');

const router = express.Router();

router.get('/', controller.home);

router.get('/interactive', controller.calendar);

router.get('/workoutScheduler', controller.scheduler);

router.get('/meetTrainer', controller.meet);

module.exports = router;