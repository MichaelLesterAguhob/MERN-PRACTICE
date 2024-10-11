
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require('./routes/user');
require("dotenv").config();

const app = express();


mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => { console.log("Connected to database") });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('pages'));
app.use('/users', userRoute);

app.listen(process.env.PORT, ()=> {console.log("Running on PORT: " + process.env.PORT)});
module.exports = { app, mongoose};