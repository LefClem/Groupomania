const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/auth');
const multerUser = require('../middlewares/multerUser')


router.post('/signup', multerUser, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);

module.exports = router;