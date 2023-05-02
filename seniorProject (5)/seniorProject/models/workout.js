const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name:{type: String, require: [true, 'cannot be empty']},
    numberOfReps:{type: String, require: [true, 'cannot be empty']},
    numberOfSets:{type: String, require: [true, 'cannot be empty']},
    description:{type: String, require: [true, 'cannot be empty']},
    picture:{type: String, require: [true, 'cannot be empty']}
});

module.exports = mongoose.model('Workout', workoutSchema);