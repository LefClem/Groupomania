const mysql = require('../db.mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.signup = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    let hash = await bcrypt.hash(password, 10);
    const user = {
        ...req.body,
        password: hash
    };
    let query = `insert into User set ?`;

    mysql.query(query, user, (err, results) => {
        if (err) {
            switch (err.code) {
                case 'ER_NO_DEFAULT_FOR_FIELD':
                res.status(400).json({ message: "Merci de renseigné toutes les informations !" });
                    break;
                case 'ER_DUP_ENTRY':
                res.status(400).json({ message: "Mail déjà existant dans la base de donnée ! " });
                    break;
            }
            console.log(err);
        } else {
            console.log(results);
            res.status(201).json({ message: "Utilisateur créé !" });
        }
    })
};

exports.login = (req, res, next) => {
    const email = req.body.email;

    let query = `SELECT * FROM User WHERE email = ?`;

    mysql.query(query, email, async (err, results) => {
        try {
            if (results == 0) {
                res.status(404).json({ message: "Email inexistant dans la base de donnée !" })
            } else {
                const valid = await bcrypt.compare(req.body.password, results[0].password);
                if (!valid) {
                    res.status(401).json({ message: "Paire identifiant/mot de passe incorrect" });
                } else {
                    res.status(200).json({ message: `Content de vous revoir ${results[0].name} !`, token: jwt.sign({ idUser: results[0].idUser }, process.env.SECRET_TOKEN, { expiresIn: "2H" }) });
                }
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    });
};