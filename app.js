const express = require('express'); // Express JS framework
const expressLayouts = require('express-ejs-layouts'); // EJS templating
const mongoose = require('mongoose'); // Package for coding with mongoDB
const flash = require('connect-flash'); // Flash package for displaying message components etc.
const session = require('express-session'); // express session for middleware and passportJS
const passport = require('passport'); // Passport authentication package
const dotenv = require('dotenv').config(); // Environment Variables

const app = express();

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Mongo connect
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {console.log('MongoDB Connected')})
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body parser // Allows to get data from form with req.body
app.use(express.urlencoded({extended: false}));

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
   res.locals.success_msg = req.flash('success_msg'); // Different messages to display
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   res.locals.loggedIn = req.isAuthenticated(); // Checks if user is logged in
   res.locals.user = req.user; // User object containing all user properties

   next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/posts'));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
