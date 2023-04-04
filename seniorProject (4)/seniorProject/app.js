// require modules
const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const memberRoutes = require('./routes/memberRoutes')
const workoutRoutes = require('./routes/workoutRoutes')


// create app
const app = express();

// configure app
let port = 1605;
let host = 'localhost';
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.use(morgan('tiny'));


// connect to Mongoose

let url = 'mongodb://127.0.0.1:27017/musclePlanner';
mongoose.connect(url, 
    {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {

    // start the server
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

// mount middleware


app.use(flash());

/*
app.use((req, res, next)=> {
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});
*/

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));


/* error prevention and implementation
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
});
*/


app.get('/', (req, res) => {
    res.render('index');
});

app.use('/members', memberRoutes);
app.use('/calendar', workoutRoutes);


/*
app.get('/signup', (req, res) => {
    res.sendFile('./views/signup.html', { root: __dirname });
});

app.get('/home', (req, res) => {
    res.sendFile('./views/MainPage.html', { root: __dirname });
});

app.get('/calendar', (req, res) => {
    res.sendFile('./views/Calender.html', { root: __dirname });
});

app.get('/calendar2', (req, res) => {
    res.sendFile('./views/calendar.html', { root: __dirname });
});

app.get('/calorieVisual', (req, res) => {
    res.sendFile('./views/calorieVisual.html', { root: __dirname });
});

*/