const mysql = require('../db.mysql');

exports.getAllPost = (req, res, next) => {
    let query = `select * from post`;
    mysql.query(query, (err, results) => {
        if(err){
            console.log(err);
            res.status(404).json({ err });
        } else {
            console.log(results);
            res.status(200).json({ results });
        }
    })
}

exports.getPostById = (req, res, next) => {

    let query = `select * from post where id = ?`;
    let id = req.params.id;

    mysql.query(query, id, (err, results) => {
        if(err){
            console.log(err);
            res.status(404).json({ err });
        } else {
            console.log(results.text);
            res.status(200).json({ results });
        }
    })
}

exports.createPost = (req, res, next) => {

}