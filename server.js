const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser= require('body-parser');
const morgan= require('morgan');
const dotenv = require('dotenv');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const app = express();

// Static Files (we dont need to write public word in the links)
app.use(express.static('public'));

//set template engine
app.use(expressLayouts);
app.set('layout', './layouts/master');       //setting master as default
app.set('view engine','ejs');

//set listener
dotenv.config();
const port = process.env.PORT;
app.listen(port, () => { console.log(`App running on port ${port}`) });

//DB connection
require('./config/db');

//morgan (it is middleware that saves request logs. For development mode. see on console it will show http requests)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// This will parse form data (middleware)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//csrf token
app.use(cookieParser());    // we need this because "cookie" is true in csrfProtection
app.use(csrf({ cookie: true }));
//pass in all views (middleware)
app.use(function(request,response,next){
    app.locals._csrf = request.csrfToken()
    next()
})

// import the routes
const generalRoutes = require('./routes/generalRoutes');
app.use('/', generalRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/', postRoutes);



