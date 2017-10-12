const express = require('express'),
    bodyParser = require('body-parser'),
    connectDomain = require('connect-domain'),
    logger = require('morgan'),
    session = require('express-session');


const http = express();
const web = express();

const portOfWeb = process.env.PORT || 80;
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

// Web Configuration
web.use(express.static(__dirname + '/views'));

// Web Router Path
web.get('/', function(req, res) {
    res.sendFile('/index.html');
});

web.listen(portOfWeb, function(){
    console.log('Web Open Port : ' + portOfWeb);
});

http.listen(portOfHTTP, function() {
    console.log('Listen Port:  ' + portOfHTTP);
});

// Routes
require('./routers/RoutersOfHttp.js')(http);