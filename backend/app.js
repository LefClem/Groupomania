const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');


app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);





module.exports = app;