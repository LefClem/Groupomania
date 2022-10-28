const mysql = require('mysql');
require('dotenv').config();

const config = {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'groupomania'
}

const connection = mysql.createConnection(config);

connection.connect((err) => {
    try {
        if(err) throw err;
        console.log("Connecté à la BDD Mysql id " + connection.threadId + ' ' + config.database);
    } catch (error) {
        console.error('Error de connexion: ' + err.stack);
    }
});


module.exports = connection;