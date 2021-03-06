var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var apiRoutes = require('./app/routes/apiRoutes.js');


/* =======================
    EXPRESS CONFIGURATION
==========================*/
var app = express();

// Port
var PORT = process.env.PORT || 3100;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Static directory
app.use(express.static('public'));

apiRoutes(app, db);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log(`Listening on PORT ${PORT}`);
    });
});