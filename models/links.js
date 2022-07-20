const mongoose = require('mongoose');
const { Schema } = mongoose;

const linksSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	user_id: {
		type: String,
		default: ''
	},
	status: {
		type: String,
		required: true,
		default: 'free'
	},
	domain: {
		type: String,
		required: true,
		unique: true

	},
	domain_id: {
		type: String,
		required: true,
		unique: true
	},
	full_link: {
		type: String,
		default: ''
	},
	sub1: {
		type: String,
		default: ''
	},
	sub2: {
		type: String,
		default: ''
	},
	sub3: {
		type: String,
		default: ''
	},
	campaign_id: {
		type: String,
		default: ''
	},
	stream_b_id: {
		type: String,
		default: ''
	},
	stream_w_id: {
		type: String,
		default: ''
	},
	geo: {
		type: String,
		default: ''
	},
	offer: {
		type: String,
		default: ''
	},
	preland:{
		type: String,
		default: ''
	},
	white: {
		type: String,
		default: ''
	}

})



module.exports = mongoose.model('links', linksSchema)