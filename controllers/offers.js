const Offers = require('../models/Offers')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res){

	if(req.user.rights === 'Developer' || req.user.rights === 'Admin'){
	try{
		const offers = await Offers.find()
		res.status(200).json(offers)
	}catch (e){
		errorHandler(res, e)
	}
	}else{
		try{
			const offers = await Offers.find({active: true})
			res.status(200).json(offers)
		}catch (e){
			errorHandler(res, e)
		}
	}
}
module.exports.getById = async function(req, res){

	try{
		const offers = await Offers.findById(req.params.id)
		res.status(200).json(offers)

	}catch (e){
		errorHandler(res, e)
	}
	
}
module.exports.remove = async function(req, res){
	try{
		await Offers.remove({_id: req.params.id})
		await Position.remove({offers: req.params.id})
		res.status(200).json({
			message: 'Offers removed'
		})
	}catch (e){
		errorHandler(res, e)
	}
	
}
module.exports.create = async function(req, res){

	console.log('good')
	const offers = new Offers({
		name: req.body.name,
		imageSrc: req.file ? req.file.path : ''
	})
	try{
		await offers.save()
		res.status(201).json(offers)
	}catch (e){
		errorHandler(res, e)
	}
	
}
module.exports.update = async function(req, res){

		try {
			if(req.body.active === '1'){
				const active = true
				const offers = await Offers.updateOne(
					{name: req.body.name},
					{active: active}
				)
				res.status(200).json(offers)
			}else if (req.body.active === '0'){
				const active = false
				const offers = await Offers.updateOne(
					{name: req.body.name},
					{active: active}
				)
				res.status(200).json(offers)
			}

		} catch (e) {
			errorHandler(res, e)
		}


}