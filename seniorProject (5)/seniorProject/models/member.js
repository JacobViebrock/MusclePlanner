const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const memberSchema = new Schema({
    firstName: {type: String, require: [true, 'cannot be empty']},
    lastName:{type: String, require: [true, 'cannot be empty']},
    phoneNumber:{type: String, require: [true, 'cannot be empty']},
    email:{type: String, require: [true, 'cannot be empty']},
    password:{type: String, require: [true, 'cannot be empty']},
    fitnessGoal:{type: String, require: [true, 'cannot be empty']},
    calorieGoal:{type: String, require: [true, 'cannot be empty']},
    memberType: {type: String, require: [true, 'cannot be empty']}
});

// replace plaintext password with hashed password before saving the document in the database
// pre middleware


module.exports = mongoose.model('Member', memberSchema);