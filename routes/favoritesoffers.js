const express = require('express')
const passport = require('passport')
const controller = require('../controllers/favoritesoffers')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.delete('/', passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.put('/', passport.authenticate('jwt', {session: false}), controller.update)


module.exports = router 