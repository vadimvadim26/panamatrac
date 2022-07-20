const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/prelandings')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}),  controller.getAll)
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create)
router.put('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)


module.exports = router 