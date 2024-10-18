const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/user')
const todoRoutes = require('./routes/todo')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Connected to database'));


app.use('/users', userRoutes);
app.use('/todos', todoRoutes);


app.listen(process.env.PORT, () => console.log(`Running at PORT : ${process.env.PORT}` ))

module.exports = {app, mongoose}

