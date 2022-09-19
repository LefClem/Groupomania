const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../db.mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

class UserModels {

    signup(user) {
        let sql = `INSERT into user SET ?`;
        return new Promise((resolve) => {
            db.query(sql, user, (err, results) => {
                if (err) throw err;
                resolve(results);
            })
        })
    }

    login(email, password) {
        let sql = `SELECT * FROM User WHERE email = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, [email, password], async (err, results) => {
                // if(err) reject( {err} );
                console.log(results);
                if (results == 0) {
                    reject({ message: "Utilisateur introuvable !" })
                } else {
                    const valid = await bcrypt.compare(password, results[0].password);
                    if (!valid) {
                        console.log(results[0].password, password);
                        reject({ message: "Paire identifiant/mot de passe incorrect" });
                    } else {
                        resolve({
                            user_id: results[0].id,
                            token: jwt.sign({ userId: results[0].id }, process.env.SECRET_TOKEN, { expiresIn: "24H" })
                        })

                    }
                }
            })
        })
    }

}


module.exports = UserModels;