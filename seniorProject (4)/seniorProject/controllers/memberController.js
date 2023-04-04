const {validationResults, validationResult} = require('express-validator');
const model = require('../models/member');
const workout = require('../models/workout');

exports.new = (req, res)=>{
    return res.render('./members/signup');
};

exports.create = (req, res, next)=>{
    let member = new model(req.body);
    if(member.email)
        member.email = member.email.toLowerCase();
    member.save()
    .then(member=> {
        req.flash('success', 'Registration succeeded!');
        res.redirect('./members/login');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('back');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('back');
        }
        next(err);
    }); 
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
    model.findOne({ email: email })
    .then(member => {
        if (!member) {
            req.flash('error', 'wrong email address');
            res.redirect('./members/login');
        } else {
        member.comparePassword(password)
        .then(result => {
            if(result) {
                req.session.member = member._id;
                req.flash('success', 'You have successfully logged in');
                res.redirect('./views/MainPage.html');
            } else {
                req.flash('error', 'wrong password');
                res.redirect('./members/login')
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