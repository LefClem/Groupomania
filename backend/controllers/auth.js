const mysql = require('../db.mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModels = require('../dao/auth.dao');
require('dotenv').config();

let userModels = new UserModels();

exports.signup = async (req, res) => {

    try {
        const user = req.file ? {
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
            profile_picture: `${req.protocol}://${req.get('host')}/images/profile/${req.file.filename}`
        } : {
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10)
        };

        await userModels.signup(user);
        res.status(201).json({ message : "Utilisateur créé !"})
    } catch (error) {
        res.status(400).json({ error});
    }
    
};

exports.login = async (req, res) => {

    try {
        const user = await userModels.login(req.body.email, req.body.password);
        console.log(user);

        res.cookie(user);
        res.status(200).json({ user })
    } catch (error) {
        switch (error.message) {
            case "Utilisateur introuvable !":
                res.status(404).json({ error });
                break;
            
            case "Paire identifiant/mot de passe incorrect":
                res.status(401).json({ error });
                break;
        }
    }

};

exports.logout = (req, res, next) => {
    res.clearCookie("jwt");
    res.status(200).json({ message : "Déconnexion !"});
    res.redirect('/login');
}


