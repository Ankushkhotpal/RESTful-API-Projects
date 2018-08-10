const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require("path");

// const productRoutes = require("./api/routes/products");
// const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/users');
// const signupRoutes = require("./api/routes/user-signup");



app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//disabling or preventing CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, x-Requested-with, Content-Typrool, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status().json({});
    }
    next();
});

app.use(express.static(__dirname + '/Views'));
//Store all HTML files in view folder.

// app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});

//Routes which should handle requests
app.use('/user', userRoutes);
// app.use('/user/signup', signupRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    // error.status(404);
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;