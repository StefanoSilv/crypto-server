// Packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const database = require('./db');

app.use('/rates', require('./controllers/rates'));
// setInterval(() => require('./controllers/live')(), 2 * 1000 * 60 * 60);

// Middleware

app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
	console.log(`Ready on port ${process.env.PORT}`);
});

module.exports = app;
