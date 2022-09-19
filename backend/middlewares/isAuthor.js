const jwt = require('jsonwebtoken');
const { locals } = require('../app');
const db = require('../db.mysql');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const userId = jwt.decode(req.headers.authorization.split(' ')[1], process.env.SECRET_TOKEN).userId;
        const id = req.params.id;
        
        db.query(`SELECT * FROM post WHERE id = ?`, id, (err, results) => {
            if(results == 0 || results == null) {
                return res.status(404).json({ message : "Post introuvable"})
            } else if (results[0].user_id !== userId) {
                return res.status(403).json({ message : "Vous n'avez pas l'autorisation !"})
            } else {
                next();
            }
        })
    } catch (error) {
        return res.status(400).json({ error})
    }

}

