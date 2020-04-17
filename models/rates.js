const mongoose = require('mongoose');

module.exports = mongoose.model('rates', {
	name: {
		type: String
	}
});
