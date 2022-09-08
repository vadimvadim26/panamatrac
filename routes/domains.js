const express = require('express')
const passport = require('passport')
const controller = require('../controllers/links')
const router = express.Router()


router.get('/', passport.authenticate('jwt', {session: false}),  controller.freelink)
router.get('/:new', passport.authenticate('jwt', {session: false}),  controller.newlink)
router.put('/', passport.authenticate('jwt', {session: false}),  controller.updateDomain)

module.exports = router 