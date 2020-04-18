const axios = require('axios');

module.exports = {
	getByDate: date => {
		axios
			.get(`http://localhost:4020/rates?date=${date}`)
			.then(res => {
				console.log(res.data);
				res.send({ rate: res.data });
			})
			.catch(err => {
				res.send({ err });
			});
	}
};
