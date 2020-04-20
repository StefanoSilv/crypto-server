// Packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const exchange = require('./functions');

const app = express();
const database = require('./db');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/rates', require('./controllers/exchange_rates'));

//Comment out the below routes if the code was pulled from git
app.use('/simpleRates', require('./controllers/rates'));
app.use('/live', require('./controllers/live'));
setInterval(() => require('./controllers/live')(), 2 * 1000 * 60 * 60);

// Middleware

app.listen(process.env.PORT, () => {
	console.log(`Ready on port ${process.env.PORT}`);
});

module.exports = app;
