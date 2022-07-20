const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose;

const offersSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
name: {
	type: String,
	required: true,
	unique: true

},
imageSrc: {
	type: String,
	default: ''
},
	active:{
		type: Boolean,
		default: false,
		required: true
	},
	new:{
		type: Boolean,
		default: true,
		required: true
	}

	
})



offersSchema.plugin(uniqueValidator)


module.exports = mongoose.model('offers', offersSchema)