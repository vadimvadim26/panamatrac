const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	login:{
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true
	},
	rights:{
		type: String,
		required: true,
		default: 'User'
	},
	register_date:{
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('users', userSchema)