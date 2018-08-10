'use strict'
module.exports = {
    name: 'rest-api',
    version: '0.0.1',
    // env: process.env.NODE_ENV || 'development',
    // port: process.env.PORT || 3000,
    mongodb: {
        uri: "mongodb://node-rest-shop:mongodb@cluster0-shard-00-00-51d9i.mongodb.net:27017,cluster0-shard-00-01-51d9i.mongodb.net:27017,cluster0-shard-00-02-51d9i.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
    }
}