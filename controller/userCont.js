const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {registerValidation, loginValidation} = require('../config/validation');

// Create user
exports.register = (req, res) => {
    const {username, email, password, password2} = req.body;
    let errors = [];

    const {error} = registerValidation(req.body);
    if (error) errors.push({msg: error.details[0].message});

    // Check passwords match
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    // Check password length
    // if (password.length < 6) {
    //     errors.push({msg: 'Password needs to be at least 6 characters'})
    // }

    if (errors.length > 0) { // Errors found
        res.render('register', {errors, username, email, password, password2})
    } else { // No errors found
        // Validation passed
        User.findOne({email: email}).then(user => {
            if (user) {
                //User exists
                errors.push({msg: 'Email is already registered'});
                res.render('register', {errors, username, email, password, password2}) // Sending the user data back to form so it can easily be edited
            } else {
                const newUser = new User({ // New user object
                    username,
                    email,
                    password
                });

                // Hashing password with bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Setting the users password to a hashed version before saving it to DB
                        newUser.password = hash;

                        newUser.save() // Saving the user to DB
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can login');
                                res.redirect('/users/login');
                            }).catch(err => console.log(err))
                    })
                })
            }
        })
    }
};

// Login user
exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
};
