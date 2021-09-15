//import express and route
const express = require('express');
const router  = express.Router();
//required controllers
const generalController = require('../controllers/generalController');

//routes
router.get('/', generalController.home);






// export to use in server.js
module.exports = router;