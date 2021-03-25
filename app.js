'use strict';
const express = require('express');
const cors = require('cors');
const db = require('./db');
const passport = require('./utils/pass');
const catRouter = require('./routes/catRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', passport.authenticate('jwt', {session: false}), userRouter);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRouter);
app.use('/auth', authRouter);


module.exports = app;
