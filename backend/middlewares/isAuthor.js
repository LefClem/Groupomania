const jwt = require('jsonwebtoken');
const db = require('../db.mysql');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const userId = jwt.decode(req.headers.authorization.split(' ')[1], "Phudizhaduaiohuloh6786782GGYsugé§èS27TS8627").userId;
        const id = req.params.id;
        console.log(typeof(req.auth.admin));
        
        db.query(`SELECT * FROM post WHERE id = ?`, id, (err, results) => {
            if(results == 0 || results == null) {
                return res.status(404).json({ message : "Post introuvable"})
            } else if (req.auth.admin !== 1 && results[0].user_id !== userId) {
                return res.status(403).json({ message : "Vous n'avez pas l'autorisation !"})
            } else if(results[0].user_id == userId || req.auth.admin == 1){
                next();
            }
        })
    } catch (error) {
        return res.status(400).json({ error })
    }

}
