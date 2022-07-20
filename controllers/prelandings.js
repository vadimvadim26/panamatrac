const Prelandings = require('../models/Prelandings')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res){

	if(req.user.rights === 'Developer'){
		try{
			const prelandings = await Prelandings.find()
			res.status(200).json(prelandings)
		}catch (e){
			errorHandler(res, e)
		}
	}else{
		try{
			const prelandings = await Prelandings.find({active: true})
			res.status(200).json(prelandings)
		}catch (e){
			errorHandler(res, e)
		}
	}
}


module.exports.create = async function(req, res){

	const prelandings = new Prelandings({
		name: req.body.name,
		geo: req.body.geo,
		offer: req.body.offer,
		avatar: req.file ? req.file.path : '',
		preview_img: req.body.preview_img,
		preland_link: req.body.preland_link,
		track_id: req.body.track_id
	})
	try{
		await prelandings.save()
		res.status(201).json(prelandings)
	}catch (e){
		errorHandler(res, e)
	}

}


module.exports.update = async function(req, res) {

		try {
			if(req.body.active === '1'){
				console.log(req.body.offer)
				const active = true

				const prelandings = await Prelandings.updateOne(
					{name: req.body.name, geo: req.body.geo, offer: req.body.offer},
					{active: active}
				)
				res.status(200).json(prelandings)
			}else if (req.body.active === '0'){
				console.log(req.body.offer)
				const active = false
				const prelandings = await Prelandings.updateOne(
					{name: req.body.name, geo: req.body.geo, offer: req.body.offer},
					{active: active}
				)
				res.status(200).json(prelandings)
			}

		} catch (e) {
			errorHandler(res, e)
		}

}