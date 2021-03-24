'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const passport = require('./utils/pass');
const catRouter = require('./routes/catRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', passport.authenticate('jwt', {session: false}), userRouter);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRouter);
app.use('/auth', authRouter);


db.on('connectec', () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
