// require modules
const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const memberRoutes = require('./routes/memberRoutes')
const workoutRoutes = require('./routes/workoutRoutes')
const passport = require("passport");
const bodyParser = require("body-parser");

// MOngoose password: g00dp4sscode

// create app
const app = express();
mongoose.set('strictQuery', false);

// configure app
let port = 1605;
let host = 'localhost';
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.use(morgan('tiny'));


// connect to Mongoose

let url = 'mongodb://127.0.0.1:27017/musclePlanner';
mongoose.connect(url) 
    //{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {

    // start the server
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

// mount middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/members', memberRoutes);
app.use('/calendar', workoutRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
})

