const db = require('../db.mysql');

class PostsModels {

    getAllPosts() {
        let sql = `SELECT * FROM post JOIN user ON post.user_id = user.id ORDER BY post.created_at DESC`;
        return new Promise((resolve) => {
            db.query(sql, (err, results) => {
                if (err) throw err;
                resolve(results);
            });
        })
    }

    getOnePost(id) {
        let sql = `SELECT * FROM post JOIN user ON post.user_id = user.id WHERE post.id = ?`;
        return new Promise((resolve) => {
            db.query(sql, id, (err, results) => {
                if (err) throw err;
                resolve(results);
            })
        })
    }

    createPost(sqlData) {
        let sql = `INSERT INTO post SET ?`;
        return new Promise((resolve) => {
            db.query(sql, sqlData, (err, results) => {
                if (err) throw err;
                resolve(results);
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

    likePost(sql1, sql2, liked) {
        let sqlInsert = 'INSERT INTO like VALUES (NULL, ?, ?)';
        // sql1 = mysql.format(sql1, sqlInserts1);
        // let sqlUpdate = 'UPDATE posts SET like = ? WHERE id = ?';
        // sql2 = mysql.format(sql2, sqlInserts2);
        let sqlDelete = 'DELETE FROM like WHERE postId = ? AND userId = ?';
        // sql3 = mysql.format(sql3, sqlInserts1);
        return new Promise((resolve) => {
            if (liked === false) {
                db.query(sqlInsert, function (err, result, fields) {
                    if (err) throw err;
                    resolve({ message: 'Like !' })
                })
            }
            if (liked === true) {
                db.query(sqlDelete, function (err, result, fields) {
                    if (err) throw err;
                    resolve({ message: 'Like annulé!' })
                })
            }
        })

    }
}



module.exports = PostsModels;

// exports.getAllPosts = `SELECT * FROM post JOIN user ON post.user_id = user.id ORDER BY post.created_at DESC`;

// exports.getPostById = `SELECT * FROM post JOIN user ON post.user_id = user.id WHERE post.id = ?`;

// exports.createPost = `INSERT INTO post SET ?`;

// exports.modifyPost = `UPDATE post SET ?, updated_at = NOW() WHERE id = ?`;

// exports.deletePost = `DELETE FROM post WHERE id = ?`
