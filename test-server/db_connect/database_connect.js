const mongoose = require('mongoose');
const config = require('config');

let DbConnection = mongoose.createConnection(config.mongodb.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

DbConnection.on('connected', function () {
    console.log('Succesfully Connected to the Mongodb.');
});

module.exports = { DbConnection };