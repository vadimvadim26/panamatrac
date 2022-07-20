const mongoose = require('mongoose');
const { Schema } = mongoose;

const geosofoffersSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
offer: {
	type: String,
	required: true

},
geo: {
	type: String,
	required: true
},
	active:{
		type: Boolean,
		default: false,
		required: true
	}
	
})



module.exports = mongoose.model('geosooffers', geosofoffersSchema)