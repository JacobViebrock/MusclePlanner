const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, require: [true, 'cannot be empty']},
    lastname:{type: String, require: [true, 'cannot be empty']},
    userName:{type: String, require: [true, 'cannot be empty']},
    email:{type: String, require: [true, 'cannot be empty']},
    password:{type: String, require: [true, 'cannot be empty']},
    fitnessGoal:{type: String, require: [true, 'cannot be empty']},
    calorieGoal:{type: String, require: [true, 'cannot be empty']}
});

module.exports = mongoose.model('User', userSchema);