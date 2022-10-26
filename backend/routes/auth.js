const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/auth');
const auth = require('../middlewares/auth');
const multerUser = require('../middlewares/multerUser')


router.post('/signup', multerUser, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', auth, userCtrl.getOneUser)
router.put('/user/:id', auth, multerUser, userCtrl.updateProfilePicture)

module.exports = router;