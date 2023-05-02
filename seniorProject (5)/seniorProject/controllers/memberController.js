const {validationResults, validationResult} = require('express-validator');
const model = require('../models/member');
const workout = require('../models/workout');
const express = require('express');
const app = express();
const mongoose = require("mongoose");

var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})

app.use(express.json());

exports.new = (req, res)=>{
    return res.render('./members/signup');
};

exports.create = (req, res, next)=>{
   

    var firstName = req.body.firstName;
    var lastName =req.body.lastName;
    var phone =req.body.phone;
    var pass = req.body.password;
    var email = req.body.email;
    var fitGoal = req.body.fitnessGoal;
    var calGoal = req.body.calorieGoal;
    
    var newMember = new model()
    newMember = {
        "firstName": firstName,
        "lastName": lastName,
        "phoneNumber": phone,
        "email": email,
        "password": pass,
        "fitnessGoal": fitGoal,
        "calorieGoal": calGoal
    }
     
    db.collection('musclePlanner/Member').insertOne(newMember,function(err, collection){
    if (err) throw err;
       console.log("Record inserted Successfully");
    });
    
    return res.redirect('./members/login');
};

exports.getUserLogin = (req, res, next) => {
    return res.render('./members/login')
}

exports.login = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error=> {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }
    let email = req.body.email;
    if(email)
        email = email.toLowerCase();
    let password = req.body.password;
    model.findOne({ email : email })
    .then(member => {
        if (!member) {
            req.flash('error', 'wrong email address');
            console.log('wrong email address');
            res.redirect('./login');
        } else {
        member.comparePassword(password)
        .then(result => {
            if(result) {
                req.session.member = member._id;
                req.flash('success', 'You have successfully logged in');
                res.redirect('../calendar');
            } else {
                req.flash('error', 'wrong password');
                res.redirect('./login')
            }
        });

    }
})
.catch(err => next(err));
};

exports.faq = (req, res, next)=>{
    model.find()
    .then(members=>res.render('./members/faq', {members}))
    .catch(err=>next(err));
};

exports.logout = (req, res, next) => {
    req.session.destroy(err=>{
        if(err)
            return next(err);
        else
            res.redirect('/');
    })
};

exports.slides = (req, res, next)=>{
    model.find()
    .then(members=>res.render('./members/slideshow', {members}))
    .catch(err=>next(err));
};