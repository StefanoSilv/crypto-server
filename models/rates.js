const mongoose = require('mongoose');

module.exports = mongoose.model('rates', {
	succes: {
		type: Boolean
	},
	target: {
		type: String
	},
	date: {
		type: Date
	},
	rates: [{}]
});
