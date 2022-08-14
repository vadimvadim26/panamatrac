const express = require('express')
const passport = require('passport')
const encryptor = require('../sub_encoder/encoder')
const router = express.Router()

router.post('/', passport.authenticate('jwt', {session: false}), encryptor.encrypt)
module.exports = router