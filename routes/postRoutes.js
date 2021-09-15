//import express and route
const express = require('express');
const router  = express.Router();
//required controllers
const postController = require('../controllers/postController');

//routes
router.get('/posts', postController.posts);
router.post('/submit-post', postController.submitPost);






// export to use in server.js
module.exports = router;