const model = require('../models/workout');

exports.home = (req, res, next)=>{
    model.find()
    .then(workouts=>res.render('./calendar/home', {workouts}))
    .catch(err=>next(err));
};

exports.calendar = (req, res, next)=>{
    model.find()
    .then(workouts=>res.render('./calendar/interactive', {workouts}))
    .catch(err=>next(err));
};

exports.scheduler = (req, res, next)=>{
    model.find()
    .then(workouts=>res.render('./calendar/workoutScheduler', {workouts}))
    .catch(err=>next(err));
};

exports.meet = (req, res, next)=>{
    model.find()
    .then(workouts=>res.render('./calendar/meet', {workouts}))
    .catch(err=>next(err));
};