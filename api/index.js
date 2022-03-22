const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const homeRoute = require('./routers/homeRoute');

const app = express()
app.listen(3000)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// database connection
mongoose.connect('mongodb://localhost:27017/PROJET_SUCESS', {useNewUrlParser: true, useUnifiedTopology: true});



// routes
app.use(homeRoute);
