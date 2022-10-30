const db = require('../db.mysql');

class PostsModels {

    getAllPosts() {
        let sql = `SELECT post.id, post.created_at, post.updated_at, post.text, post.image_url, post.user_id, user.name, user.profile_picture FROM post JOIN user ON post.user_id = user.id ORDER BY post.updated_at DESC`;
        return new Promise((resolve) => {
            db.query(sql, (err, results) => {
                if (err) throw err;
                resolve(results);
            });
        })
    }

    getOnePost(id) {
        let sql = `SELECT post.id, post.created_at, post.updated_at, post.text, post.image_url, post.user_id, user.name FROM post JOIN user ON post.user_id = user.id WHERE post.id = ?`;
        return new Promise((resolve) => {
            db.query(sql, id, (err, results) => {
                if (err) throw err;
                resolve(results);
            })
        })
    }

    createPost(sqlData) {
        let sql = `INSERT INTO post SET ?`;
        let sqlSearch = "SELECT * FROM post WHERE id = ?"
        return new Promise((resolve) => {
            db.query(sql, sqlData, (err, results) => {
                if (err) throw err;
                db.query(sqlSearch, results.insertId, (err, results) => {
                    resolve(results);
                })
            })
        })
    }

    updatePost(values, id) {
        let sql = `UPDATE post SET ?, updated_at = NOW() WHERE id = ?`;
        return new Promise((resolve) => {
            db.query(sql, [values, id], (err, results) => {
                if (err) throw err;
                resolve(results);
            })
        })
    }

    deletePost(id) {
        let sql = `DELETE FROM post WHERE id = ?`;
        return new Promise((resolve) => {
            db.query(sql, id, (err, results) => {
                if (err) throw err;
                resolve(results);
            })
        })
    }

    getAllLikes(id){
        let sql = 'SELECT * FROM groupomania.like WHERE postId = ?'
        return new Promise((resolve) => {
            db.query(sql, id, (err, results) => {
                if(err) throw err;
                resolve(results)
            })
        })

    }

    likePost(postId, userId) {
        let sqlSearch = `SELECT * FROM groupomania.like WHERE postId = ? AND userId = ?`
        let sqlInsert = `INSERT INTO groupomania.like VALUES (NULL, ?, ?)`;
        let sqlDelete = 'DELETE FROM groupomania.like WHERE postId = ? AND userId = ?';
        return new Promise((resolve) => {
            db.query(sqlSearch, [postId, userId],(err, results) => {
                if(err) throw err;
                if(results.length > 0 && results[0].postId == postId && results[0].userId == userId){
                    db.query(sqlDelete, [postId, userId], (err, result) => {
                        if(err) console.log(err);
                        resolve({ message : 'Like annulé !'})
                    })
                } else {
                    db.query(sqlInsert, [postId, userId], (err, result) => {
                        if(err) console.log(err); 
                        resolve({ message : 'Like !'});
                    })
                }
            })
        })
    }
}



module.exports = PostsModels;

