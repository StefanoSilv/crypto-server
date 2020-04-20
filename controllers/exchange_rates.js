const Rates = require('../models/rates');
const router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res) => {
	if (req.query.date) {
		req.query.date = new Date(req.query.date);
	}

	req.query && req.query.date
		? Rates.aggregate([
			{ $match: req.query },
			//Change target: 1 to "currency":"target"
			{ $project: { _id: 0, target: 1, rates: 1, date: 1 } }
		  ])
			.then(rate => {
				res.send({ rate });
			})
			.catch(err => res.send(err))
		: res.send({ err: 'Insert a valid argument' });
});

module.exports = router;
