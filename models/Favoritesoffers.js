const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose;

const favoritesoffersSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
user_id: {
	type: String,
	required: true

},
	offer_id: {
		type: String,
		required: true

	}

})



favoritesoffersSchema.plugin(uniqueValidator)


module.exports = mongoose.model('favoritesoffers', favoritesoffersSchema)