const mongoose = require('mongoose');

// Shape of posts
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    message: {
        type: String,
        required: true,
        min: 3
    },
    user: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
