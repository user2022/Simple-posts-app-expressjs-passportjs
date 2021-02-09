module.exports = {
    ensureAuthenticated: (req, res, next) => { // Making sure the user is authenticated before viewing certain resources
        if (req.isAuthenticated())  return next();

        req.flash('error_msg', 'Please login to view this resource'); // Display error message
        res.redirect('/users/login');  // Redirect to login page
    }
};
