const axios = require('axios');

module.exports = {
	getByDate: date => {
		axios
			.get(`${process.ENV.API}/rates?date=${date}`)
			.then(res => {
				return res.data;
			})
			.catch(err => {
				return { err };
			});
	},
	getByPastDays: number => {
		let date = new Date();
		let pastDate = new Date(
			date.setDate(date.getDate() - number)
		).toISOString();
		axios
			.get(`${process.ENV.API}/rates?date=${pastDate.toString().substr(0, 10)}`)
			.then(res => {
				console.log(res.data);
				return res.data;
			})
			.catch(err => {
				return { err };
			});
	},
	getPastMonth: () => {
		let date = new Date();
		let pastDate = new Date(date.setDate(date.getDate())).toISOString();
		let year = pastDate.toString().substr(0, 5);
		let month = (Number(pastDate.toString().substr(5, 2)) - 1)
			.toString()
			.padStart(2, '0');
		let day = pastDate.toString().substr(7, 3);
		let dateQuery = year + month + day;
		axios
			.get(`${process.ENV.API}/rates?date=${dateQuery}`)
			.then(res => {
				console.log(res.data);
				return res.data;
			})
			.catch(err => {
				return { err };
			});
	},
	getPastYear: () => {
		let date = new Date();
		let pastDate = new Date(date.setDate(date.getDate())).toISOString();
		let year = (Number(pastDate.toString().substr(0, 4)) - 1).toString();
		let month = pastDate.toString().substr(4, 3);
		let day = pastDate.toString().substr(7, 3);
		let dateQuery = year + month + day;
		axios
			.get(`${process.ENV.API}/rates?date=${dateQuery}`)
			.then(res => {
				console.log(res.data);
				return res.data;
			})
			.catch(err => {
				return { err };
			});
	}
};
