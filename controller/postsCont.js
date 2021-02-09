const Post = require('../models/Post');
const {postValidation} = require('../config/validation');

// Create post
exports.createPost = (req, res) => {
    const {title, message, user} = req.body;
    let errors = []; // Errors will be pushed to array

    const {error} = postValidation(req.body); // Validating the incoming request from user
    if (error) errors.push({msg: error.details[0].message}); // If an error exists, add it to the array

    if (errors.length > 0) {
        res.render('posts/create', {errors, title, message}); // Sending the error message back to the user
    } else { // If no errors
        const newPost = new Post({ // Creating a new post object
            title,
            message,
            user
        });

        if (req.isAuthenticated()) { // Making sure the user is authenticated before saving the post to DB
            newPost.user = req.user.username;

            newPost.save().then(() => { // Saving the post then redirecting the user with a success message
                req.flash('success_msg', 'Your post has been submitted');
                res.redirect('/');
            }).catch(err => console.log(err))
        } else {
            req.flash('error_msg', 'You must be logged in to submit a post');
            res.redirect('/');
        }
    }
};

// Read
exports.getPosts = (req, res) => {
    Post.find({}, (err, posts) => { // Get all posts
        if (err) return console.log(err);

        res.render('home', {posts}); // Sending list of posts to home.ejs file
    });
};

// Get one
exports.fetchPost = (req, res) => {
    Post.findOne({_id: req.params.id}, (err, post) => {  // Finding by ID
        if (err) return console.log(err);


        res.render('posts/update', {post}); // Sending the specific post to update.ejs
    })
};

// Update
exports.updatePost = (req, res) => {
    const {title, message} = req.body;

    let errors = [];
    const {error} = postValidation(req.body); // Validating the post update

    if (error) errors.push({msg: error.details[0].message});

    Post.findOneAndUpdate({_id: req.params.id}, // Getting one post
        {$set: {title: title, message: message}}, // Setting the data to new data inputted from user
        (err, res) => {
            if (err) return console.log(err);
        });
    res.redirect('/'); // Redirecting to home
};
