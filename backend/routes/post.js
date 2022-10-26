const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const postCtrl = require('../controllers/post');
const isAuthor = require('../middlewares/isAuthor');

router.get('/post', auth, postCtrl.getAllPost);
router.get('/post/:id', auth, postCtrl.getPostById);
router.post('/post', auth, multer, postCtrl.createPost);
router.put('/post/:id', auth, isAuthor, multer, postCtrl.updatePost);
router.delete('/post/:id', auth, isAuthor, multer, postCtrl.deletePost);
router.get('/post/:id/like', auth, postCtrl.getAllLikes)
router.post('/post/:id/like', auth, postCtrl.likePost);

module.exports = router;