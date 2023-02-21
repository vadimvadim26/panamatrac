const Links = require('../models/Links')
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


module.exports.allLinks = async function(req, res){
    try{
        const links = await Links.find()
        res.status(200).json(links)
    }catch (e){
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res){
        let split = '='
        let paramarr = req.params.status.split(split)

           try{
            const links = await Links.find({user_id: req.user._id,status: paramarr[1]})
            res.status(200).json(links)
        }catch (e){
            errorHandler(res, e)
        }


}

module.exports.removelink = async function(req, res){
           try{
            const links = await Links.updateOne({full_link: req.body.full_link}, {status: 'free', user_id: ''})
            res.status(200).json(links)
        }catch (e){
            errorHandler(res, e)
        }


}

module.exports.updateDomain = async function(req, res){

    if (req.body.linkStatus){
        try{
            const links = await Links.updateOne({_id: req.body.linkId}, {status: req.body.linkStatus})
            res.status(200).json(links)
        }catch (e){
            errorHandler(res, e)
        }
    }else if (req.body.freelink){
        console.log(req.body.name)
        try{
            const links = await Links.updateOne({domain: req.body.name}, {status: 'free', user_id: ''})
            res.status(200).json(links)
        }catch (e){
            errorHandler(res, e)

        }
    }else if(req.body.linksDead){
        console.log(req.body.linksDead)
        try{
            let links = await Links.updateOne({domain: req.body.domain},{status: req.body.status})
            res.status(200).json(links)
        }catch (e){
            errorHandler(res, e)
        }
    }


}

module.exports.create = async function(req, res){

    try{
        let domarray = []

        for(let d =0; d<req.body.length; d++){
            let dom = req.body[d]
            const findomain = await Links.findOne({
                domain: dom.domain
            })
            if(findomain){
                //dublicate
            }else if(!findomain) {
                domarray.push({status: dom.status, domain: dom.domain,domain_id: dom.domain_id})
            }
        }
       let links = await Links.insertMany(domarray)
        res.status(200).json(links)
    }catch (e){
        errorHandler(res, e)
    }

}

module.exports.update = async function (req, res) {


    await Links.findOne({domain: req.body.domain})

    if (!req.body.offer) {
        if (req.body.domain) {

            const links = await Links.updateOne(
                {domain: req.body.domain},
                {status: 'inwork',
                        user_id: req.body.user_id}
            )
            res.status(200).json(links)
        }
    } else if(req.body.offer){

        if (req.body.domain) {
            console.log(req.body.white)
            const links = await Links.updateOne(
                {domain: req.body.domain, user_id: req.body.user_id, status: 'inwork'},
                {user_id: req.body.user_id,
                    status: req.body.status,
                    domain: req.body.domain,
                    full_link: req.body.full_link,
                    sub1: req.body.sub1,
                    sub2: req.body.sub2,
                    sub3: req.body.sub3,
                    campaign_id: req.body.campaign_id,
                    stream_b_id: req.body.stream_b_id,
                    stream_w_id: req.body.stream_w_id,
                    geo: req.body.geo,
                    offer: req.body.offer,
                    preland: req.body.preland,
                    white: req.body.white
                }
            )
            res.status(200).json(links)
        }
    }


    else {
        errorHandler(res)
    }

}


