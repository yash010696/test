const config = require('config');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

startServer();

async function startServer() {
    app.use(cors());
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use('/', routes);
    try {
        let port = config.server.port;
        await http.createServer(app).listen(port, config.server.host);
        console.log('Express server listening on port ' + port);
    } catch (e) {
        console.log(e);
    }
}