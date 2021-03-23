'use strict';

const express = require('express');
const userController = require('../controllers/userController.js');
const userRouter = express.Router();

userRouter.route('/')
    .get(userController.getUserList)
    .post( userController.createUser);

userRouter.get('/:id', userController.getUser);

module.exports = userRouter;
