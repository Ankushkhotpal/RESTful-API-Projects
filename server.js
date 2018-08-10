const express = require("express");
// const bodyParser = require("body-parser");
const App = require('./app');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// db instance connection
// require('./config/mongodb');

const http = require('http');
const app = http.createServer(App);

//crearing database conection using mongoose
mongoose.connect(
    //config.mongodb.uri,
    // {
    //     useMongoClient: true
    // },// "mongo": "^0.1.0" should be in packges.json file to mongo client,
    "mongodb://node-rest-shop:mongodb@cluster0-shard-00-00-51d9i.mongodb.net:27017,cluster0-shard-00-01-51d9i.mongodb.net:27017,cluster0-shard-00-02-51d9i.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
    {
        useNewUrlParser: true
    }
);

//To avoid depricated worning of mongoose
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});


// const app = express();

const port = process.env.PORT || 3001;
App.use(bodyParser.urlencoded({
    extended: true
}));
App.use(bodyParser.json());

App.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});