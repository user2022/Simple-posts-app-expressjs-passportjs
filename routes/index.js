const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const postsCont = require('../controller/postsCont');

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => { // Ensure authenticated will make sure the user is logged in before displaying page
    res.render('dashboard', {
        name: req.user.username
    })
});

module.exports = router;


