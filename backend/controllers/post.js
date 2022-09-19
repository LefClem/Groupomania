const jwt = require('jsonwebtoken');
const fs = require('fs');
const PostsModels = require('../dao/post.dao');
require('dotenv').config();

let postsModels = new PostsModels();

exports.getAllPost = async (req, res) => {

    try {
        let posts = await postsModels.getAllPosts();
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
                user_id: jwt.decode(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN).userId,
                image_url: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
            } : {
                ...req.body,
                user_id: jwt.decode(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN).userId
            };

        await postsModels.createPost(post);
        res.status(201).json({ message: "Post créé !" });
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
        if (post[0].image_url != 0) {
            await postsModels.deletePost(req.params.id);
            res.status(200).json({ message: "Le post a bien été supprimé !" });
            const filename = post[0].image_url.split('/images/post/')[1];
            fs.unlink(`images/post/${filename}`, (err) => {
                if (err) {
                    throw err;
                } 
            });
        } else {
            await postsModels.deletePost(req.params.id);
            res.status(200).json({ message: "Le post a bien été supprimé !" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }

}

exports.likePost = async (req,res) => {
    let userId = jwt.decode(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN).userId;
    let postId = req.body.postId;
    let sqlData1 = [postId, userId];
    let like = await postsModels.likePost(sqlData1, req.body.liked)
    res.status(201).json({ like });
}