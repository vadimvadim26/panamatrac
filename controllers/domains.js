const Links = require('../models/links')
const errorHandler = require('../utils/errorHandler')

module.exports.freelink = async function(req, res){
    try{
        const links = await Links.findOne({status: 'free'})
        res.status(200).json(links)
    }catch (e){
        errorHandler(res, e)
    }
}

module.exports.newlink = async function(req, res){
    try{
        const links = await Links.findOne({status: 'new'})
        res.status(200).json(links)
    }catch (e){
        errorHandler(res, e)
    }
}









