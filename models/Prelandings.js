const mongoose = require('mongoose');
const { Schema } = mongoose;

const prelandingsSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		required: true
	},
	geo: {
		type: String,
		required: true
	},
	offer: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	preview_img: {
		type: String,
		required: true
	},
	preland_link: {
		type: String,
		required: true
	},
	track_id:{
		type: String,
		required: true
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




module.exports = mongoose.model('prelandings', prelandingsSchema)