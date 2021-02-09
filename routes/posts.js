const express = require('express');
const router = express.Router();
const postsCont = require('../controller/postsCont');
const {ensureAuthenticated} = require('../config/auth');

// Home Page with posts // READ
router.get('/', postsCont.getPosts);

// CREATE posts page
router.get('/posts/create', ensureAuthenticated, (req, res) => { // Only allow create post if authenticated
    res.render('posts/create');
});

// create a post
router.post('/posts/create', postsCont.createPost);

//  Update
router.get('/posts/:id', ensureAuthenticated, postsCont.fetchPost);
router.post('/posts/:id', postsCont.updatePost);




module.exports = router;
