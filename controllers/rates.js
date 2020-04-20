const Rates = require('../models/rates');
const router = require('express').Router();
const axios = require('axios');

const getPastDays = number => {
	let date = new Date();
	let pastDate = new Date(date.setDate(date.getDate() - number)).toISOString();
	return pastDate;
};

const getPastPastDays = number => {
	let date1 = new Date(getPastDays(1387));

	let pastDate1 = new Date(
		date1.setDate(date1.getDate() - number)
	).toISOString();
	return pastDate1;
};
//Partire dall'899 e 900imo
router.post('/', (req, res) => {
	for (let i = 0; i < 490; i++) {
		axios
			.get(
				`http://api.coinlayer.com/${getPastPastDays(i)
					.toString()
					.substr(0, 10)}?access_key=${
					process.env.REACT_APP_COINLAYER_KEY
				}&target=EUR`
			)
			.then(res => {
				Rates.findOneAndUpdate(
					{ date: res.data.date, target: res.data.target },
					{
						success: res.data.success,
						target: res.data.target,
						date: res.data.date,
						rates: res.data.rates
					},
					{
						upsert: true,
						runValidators: true,
						setDefaultsOnInsert: true,
						new: true
					}
				)
					.then(response => {
						console.log(i);
					})
					.catch(err => {
						console.log({ err });
					});
			})
			.catch(err => {
				console.log({ err });
			});
	}
});
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
