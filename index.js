const express = require('express'),
    bodyParser = require('body-parser'),
    connectDomain = require('connect-domain'),
    logger = require('morgan'),
    session = require('express-session');


const http = express();
const portOfHTTP = process.env.PORT || 8080;

// Http Configuration
http.use(express.static(__dirname + '/public'));
http.use(logger('dev'));
http.use(bodyParser.text({ defaultCharset: 'utf-8' }));
http.use(connectDomain());

// Added for error: request entity too large --start
http.use(bodyParser.json({ limit: '64mb' }));
http.use(bodyParser.urlencoded({ limit: '64mb', extended: true }));
// Added for error: request entity too large --end

http.listen(portOfHTTP, function() {});

// Routes
require('./routers/RoutersOfHttp.js')(http);