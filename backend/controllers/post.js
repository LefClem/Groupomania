const fs = require('fs');
const PostsModels = require('../dao/post.dao');
require('dotenv').config();

let postsModels = new PostsModels();

exports.getAllPost = async (req, res) => {

    try {
        let posts = await postsModels.getAllPosts();
        console.log(req.auth);
        res.status(200).json({ posts });
    } catch (error) {
        res.status(400).json({ error });
    }

}

exports.getPostById = async (req, res) => {

    try {
        let post = await postsModels.getOnePost(req.params.id);
        res.status(200).json({ post });
    } catch (error) {
        res.status(400).json({ error });
    }

}

exports.createPost = async (req, res) => {

    try {
        let post = req.file ?
            {
                ...req.body,
                user_id: req.auth.id,
                image_url: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
            } : {
                ...req.body,
                user_id: req.auth.id,
                image_url: ""
            };

        let results = await postsModels.createPost(post);
        res.status(201).json({ results });
    } catch (error) {
        res.status(400).json({ error });
    }

}

exports.updatePost = async (req, res) => {

    try {
        let values = req.file ? {
            ...req.body,
            image_url: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
        } : {
            ...req.body,
        }

        await postsModels.updatePost(values, req.params.id);
        res.status(201).json({ message: "Post modifié !" });
    } catch (error) {
        res.status(400).json({ error });
    }

}

exports.deletePost = async (req, res) => {

    try {
        let post = await postsModels.getOnePost(req.params.id);
        if (post[0].image_url !== '') {
            await postsModels.deletePost(req.params.id);
            const filename = post[0].image_url.split('/images/post/')[1];
            fs.unlink(`images/post/${filename}`, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("image supprimée !");
                }
            });
            res.status(200).json({ message: "Le post a bien été supprimé !" });
        } else if(post[0].image_url == null || post[0].image_url == ''){
            await postsModels.deletePost(req.params.id);
            res.status(200).json({ message: "Le post a bien été supprimé !" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }

}

exports.getAllLikes = async (req, res) => {
    try {
        let postId = Number(req.params.id);
        let likes = await postsModels.getAllLikes(postId);
        res.status(200).json(likes);
    } catch (error) {
        res.status(404).json(error);
    }
}

exports.likePost = async (req,res) => {
    try {
        let userId = req.auth.id;
        let postId = Number(req.params.id);
        let like = await postsModels.likePost(postId, userId)
        res.status(201).json({like})
    } catch (error) {
        res.status(400).json({ error })
    }
}