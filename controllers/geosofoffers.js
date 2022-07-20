const Geosofoffers = require('../models/Geosofoffers')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res){

    if(req.user.rights === 'Developer' || req.user.rights === 'Admin'){
        try{
            const geosofoffers = await Geosofoffers.find()
            res.status(200).json(geosofoffers)
        }catch (e){
            errorHandler(res, e)
        }
    }else{
        try{
            const geosofoffers = await Geosofoffers.find({active: true})
            res.status(200).json(geosofoffers)
        }catch (e){
            errorHandler(res, e)
        }
    }
}



module.exports.update = async function(req, res) {
    const geosofoffer = await Geosofoffers.findOne({
            offer: req.body.offer,
            geo: req.body.geo
        }
    )
    if(!req.body.active) {
        if (!geosofoffer) {
            if (req.user.rights === 'Developer' || req.user.rights === 'Admin') {
                try {
                    const geosofoffers = await Geosofoffers.insertMany({
                        offer: req.body.offer,
                        geo: req.body.geo
                    })
                    res.status(201).json(geosofoffers)
                } catch (e) {
                    errorHandler(res, e)
                }
            }
        }
    }else if (req.body.active){
        try {
            if(req.body.active === '1'){
                console.log(req.body.offer)
                const active = true

                const geosofoffers = await Geosofoffers.updateOne(
                    {offer: req.body.offer, geo: req.body.geo},
                    {active: active}
                )
                res.status(200).json(geosofoffers)
            }else if (req.body.active === '0'){
                console.log(req.body.offer)
                const active = false
                const geosofoffers = await Geosofoffers.updateOne(
                    {geo: req.body.geo, offer: req.body.offer},
                    {active: active}
                )
                res.status(200).json(geosofoffers)
            }

        } catch (e) {
            errorHandler(res, e)
        }
    }
}


