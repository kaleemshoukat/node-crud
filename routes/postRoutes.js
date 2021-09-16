//import express and route
const express = require('express');
const router  = express.Router();
//required controllers
const postController = require('../controllers/postController');

//routes
router.get('/add-post', postController.addPost);
router.post('/submit-post', postController.submitPost);
router.get('/posts', postController.posts);






// export to use in server.js
module.exports = router;