const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser= require('body-parser');
const app = express();

// Static Files (we dont need to write public word in the links)
app.use(express.static('public'));

//set template engine
app.use(expressLayouts);
app.set('layout', './layouts/master');       //setting master as default
app.set('view engine','ejs');

//set listener
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
app.listen(port, () => { console.log(`App running on port ${port}`) });

// This will parse form data (middleware)
app.use(bodyParser.urlencoded({ extended: true }));

// import the routes
const generalRoutes = require('./routes/generalRoutes');
app.use('/', generalRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/', postRoutes);

//route test
// app.get('/', (req,res) =>{
//     //console.log('Hello!');
//     res.render('home.ejs', {title: 'Home'});
// });



