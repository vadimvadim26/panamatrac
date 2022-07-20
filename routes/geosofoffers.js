const express = require('express')
const passport = require('passport')
const controller = require('../controllers/geosofoffers')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}),  controller.getAll)
router.put('/', passport.authenticate('jwt', {session: false}), controller.update)



module.exports = router 