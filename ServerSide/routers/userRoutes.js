
const router = require('express').Router()
const userController = require('../controllers/usercontroller')
var passport = require('passport');
require('../middleware/passport')(passport)
const adminAuth = require('../middleware/adminAuth')

router.post('/register', userController.register)
router.post('/register/byadmin', passport.authenticate('jwt', { session: false }), adminAuth, userController.register)
router.post('/login', userController.login)
router.post('/refresh_token', userController.getAccessToken)
router.get('/getuserInfo', passport.authenticate('jwt', { session: false }), userController.getuserInfo)
router.get('/logout', userController.logout);
router.post('/forgot', userController.resetpassword);
router.patch('/reset/:token', passport.authenticate('jwt', { session: false }), userController.forgetpassword);
router.patch('/update', passport.authenticate('jwt', { session: false }), userController.updateUser);
router.post('/comparirepass', passport.authenticate('jwt', { session: false }), userController.compairpassword);
router.post('/getallusers', passport.authenticate('jwt', { session: false }), adminAuth, userController.getallusers)
router.delete('/delete/:id', userController.deleteUser)
router.patch('/updaterole/:id', passport.authenticate('jwt', { session: false }), adminAuth, userController.updateUsersRole)

// router.patch('/changepassword', passport.authenticate('jwt', { session: false }), userController.changepassword)




module.exports = router