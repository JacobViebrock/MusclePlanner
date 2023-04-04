const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const memberSchema = new Schema({
    firstName: {type: String, require: [true, 'cannot be empty']},
    lastName:{type: String, require: [true, 'cannot be empty']},
    username:{type: String, require: [true, 'cannot be empty']},
    phoneNumber:{type: String, require: [true, 'cannot be empty']},
    email:{type: String, require: [true, 'cannot be empty']},
    password:{type: String, require: [true, 'cannot be empty']},
    fitnessGoal:{type: String, require: [true, 'cannot be empty']},
    calorieGoal:{type: String, require: [true, 'cannot be empty']},
    memberType: {type: String, require: [true, 'cannot be empty']}
});

// replace plaintext password with hashed password before saving the document in the database
// pre middleware

memberSchema.pre('save', function(next){
    let member = this;
    if(!member.isModified('password'))
        return next();
    bcrypt.hash(member.password, 10)
    .then(hash=>{
        member.password = hash;
        next();
    })
    .catch(err=>next(err));
});

memberSchema.methods.comparePassword = function(inputPassword) {
    let member = this;
    return bcrypt.compare(inputPassword, member.password);
}

module.exports = mongoose.model('Member', memberSchema);