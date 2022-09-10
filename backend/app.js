const express = require('express');
// const mysql = require('mysql');
const app = express();
// const db = require('./db.mysql');
require('dotenv').config();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');


app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);





module.exports = app;