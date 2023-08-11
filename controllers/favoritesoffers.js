const Favoritesoffers = require('../models/Favoritesoffers')
const errorHandler = require('../utils/errorHandler')


module.exports.create = async function(req, res){

	console.log(req.body)
	const favoritesoffers = new Favoritesoffers({
		user_id: req.body.user.name,
		offer_id: req.body.offer
	})
	try{
		await favoritesoffers.save()
		res.status(201).json(favoritesoffers)
	}catch (e){
		errorHandler(res, e)
	}
	
}

module.exports.update = async function(req, res){

	console.log(req.body, 'tt')

	const favoritesoffers = await Favoritesoffers.deleteOne({
		user_id: req.body.user.name,
		offer_id: req.body.offer
	})
	res.status(200).json(favoritesoffers)
}


module.exports.getAll = async function(req, res){
console.log(req.user.login, 'ff')
	try{
		const favoritesoffers = await Favoritesoffers.find({user_id: req.user.login})
		res.status(200).json(favoritesoffers)
	}catch (e){
		errorHandler(res, e)
	}
}

module.exports.remove = async function(req, res){




}