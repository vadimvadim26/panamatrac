const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const moment = require('moment')
module.exports.login = async function(req, res){
	const candidate = await User.findOne({login: req.body.login})

	if(candidate){
		//success 
		const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
		if(passwordResult){
			//generate token, if pass true
			let new_user = {
				name: candidate.login,
				rights: candidate.rights,
				user_id: candidate._id,
			}
			const token = jwt.sign({
				login: candidate.login,
				userId: candidate._id,
				rights: candidate.rights
			}, keys.jwt, {expiresIn: 60 * 60 })
			res.status(200).json({
				token: `Bearer ${token}`,
				user: JSON.stringify(new_user)
			})
		}else{
			res.status(401).json({
				message: 'Passwords do not match'
			})
		}
	}else{
		//
		res.status(404).json({
			message: 'user with this login address not found'
		})
	}
}




module.exports.register = async function(req, res){
	//email password
	const candidate = await User.findOne({login: req.body.login})
	if(candidate){
		//if user error
		res.status(409).json({
			message: 'login already in use'
		})
	}else{
		//create new user
		const salt = bcrypt.genSaltSync(10)
		const password = req.body.password
		const user = new User({
			login: req.body.login,
			password: bcrypt.hashSync(password, salt)

		})
		try{
		await user.save()
		res.status(201).json(user)
		} catch(e){
			errorHandler(res, e)
		}
	}
}