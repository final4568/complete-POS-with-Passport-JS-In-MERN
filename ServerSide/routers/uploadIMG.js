const express = require('express')
const router = express.Router()
const imageController = require('../controllers/imageController')
const uploadimg = require('../middleware/uploadImg')
var passport = require('passport');


router.post('/upload', uploadimg, passport.authenticate('jwt', { session: false }), imageController.upload)

module.exports = router