const Favoritesoffers = require('../models/Favoritesoffers')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res){

	if(req.user.rights === 'Developer' || req.user.rights === 'Admin'){
	try{
		const Favoritesoffers = await Favoritesoffers.find()
		res.status(200).json(Favoritesoffers)
	}catch (e){
		errorHandler(res, e)
	}
	}else{
		try{
			const Favoritesoffers = await Favoritesoffers.find({active: true})
			res.status(200).json(Favoritesoffers)
		}catch (e){
			errorHandler(res, e)
		}
	}
}
module.exports.getById = async function(req, res){

	try{
		const Favoritesoffers = await Favoritesoffers.findById(req.params.id)
		res.status(200).json(Favoritesoffers)

	}catch (e){
		errorHandler(res, e)
	}
	
}
module.exports.remove = async function(req, res){
	try{
		await Favoritesoffers.remove({_id: req.params.id})
		await Position.remove({Favoritesoffers: req.params.id})
		res.status(200).json({
			message: 'Favoritesoffers removed'
		})
	}catch (e){
		errorHandler(res, e)
	}
	
}
module.exports.create = async function(req, res){

	console.log('good')
	const Favoritesoffers = new Favoritesoffers({
		name: req.body.name,
		imageSrc: req.file ? req.file.path : ''
	})
	try{
		await Favoritesoffers.save()
		res.status(201).json(Favoritesoffers)
	}catch (e){
		errorHandler(res, e)
	}
	
}
module.exports.update = async function(req, res){

		try {
			if(req.body.active === '1'){
				const active = true
				const Favoritesoffers = await Favoritesoffers.updateOne(
					{name: req.body.name},
					{active: active}
				)
				res.status(200).json(Favoritesoffers)
			}else if (req.body.active === '0'){
				const active = false
				const Favoritesoffers = await Favoritesoffers.updateOne(
					{name: req.body.name},
					{active: active}
				)
				res.status(200).json(Favoritesoffers)
			}

		} catch (e) {
			errorHandler(res, e)
		}


}