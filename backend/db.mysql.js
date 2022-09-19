const mysql = require('mysql');
require('dotenv').config();

const config = {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'Groupomania'
}

const connection = mysql.createConnection(config);

connection.connect((err) => {
    try {
        console.log("Connecté à la BDD Mysql id " + connection.threadId + ' ' + config.database);
    } catch (error) {
        console.error('Error de connexion: ' + err.stack);
    }
});


module.exports = connection;