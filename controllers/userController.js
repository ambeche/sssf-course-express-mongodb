'use strict';

const userModel = require('../models/userModel');
const users = userModel.users;

const removePasswordFromUserData = (userList) => {
  const modifiedUserList = userList.concat();
  modifiedUserList.forEach((user) => delete user.password);
  return modifiedUserList;
};

const getUserList = (req, res) => {
  res.json(removePasswordFromUserData(users));
};

const getUser = (req, res) => {
  const id = req.params.id;
  const querrieduser = users.filter((user) => user.user_id === Number(id));

  querrieduser ?
    res.json(removePasswordFromUserData(querrieduser)) :
    res.status(404).send('invalid user id');
};

const createUser = (req, res) => {
  console.log('created user', req.body);
  res.json(req.body);
};

module.exports = {
  getUserList,
  getUser,
  createUser,
};
