const Rates = require('../models/rates');
const router = require('express').Router();
const axios = require('axios');

const getPastDays = number => {
	let date = new Date();
	let pastDate = new Date(date.setDate(date.getDate() - number)).toISOString();
	return pastDate;
};

router.post('/', (req, res) => {
	for (let i = 0; i < 7; i++) {
		axios
			.get(
				`http://api.coinlayer.com/${getPastDays(i)
					.toString()
					.substr(0, 10)}?access_key=${
					process.env.REACT_APP_COINLAYER_KEY
				}&target=EUR&symbols=BTC,ETH,XRP,BCH,EOS,LTC`
			)
			.then(res => {
				console.log('res.data', res.data);
			});
	}
});
module.exports = router;
