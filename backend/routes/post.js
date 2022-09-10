const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/post');

router.get('/post', auth, postCtrl.getAllPost);
router.get('/post/:id', postCtrl.getPostById);

module.exports = router;