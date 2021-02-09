const express = require('express');
const router = express.Router();
const userCont = require('../controller/userCont');

// Login page
router.get('/login', (req, res) => {
    res.render('Login');
});

// Register page
router.get('/register', (req, res) => {
    res.render('Register');
});

// Register handle
router.post('/register', userCont.register);

// Login handle
router.post('/login', userCont.login);

// Logout handle
router.get('/logout', userCont.logout);

module.exports = router;


