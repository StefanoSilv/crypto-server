const Rates = require('../models/rates');
const axios = require('axios');

module.exports = () => {
	let today = new Date().toISOString();
	axios
		.get(
			`http://api.coinlayer.com/${today.toString().substr(0, 10)}?access_key=${
				process.env.REACT_APP_LIVE_COINLAYER_KEY
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
					console.log('data', response);
				})
				.catch(err => {
					console.log({ err });
				});
		})
		.catch(err => {
			console.log({ err });
		});
};
